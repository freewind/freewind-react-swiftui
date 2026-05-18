import {
  createContext,
  useContext,
  useMemo,
  useState,
  type FC,
  type PropsWithChildren,
  type ReactNode,
} from 'react'
import { findNode, joinPath, removeNode, renameNode, uniquePath, updateNode } from '../../mock-system/fileTree'
import { createInitialIdentity, initialFiles, initialMessages, initialPeers } from './mockData'
import type {
  AppFileApi,
  AppShell,
  AppSystemApi,
  ChatMessage,
  DeviceIdentity,
  MockEnvironment,
  MockFileNode,
  MockOpenEvent,
  OutgoingFile,
  PeerDigest,
} from '../../mock-system/types'
import { ensureFolder } from '../../mock-system/fileTree/ensureFolder'

type MockEnvironmentProviderProps = PropsWithChildren

const MockEnvironmentContext = createContext<MockEnvironment | null>(null)

export const MockEnvironmentProvider: FC<MockEnvironmentProviderProps & { children: ReactNode }> = ({ children }) => {
  const [identity, setIdentity] = useState<DeviceIdentity>(createInitialIdentity())
  const [files, setFiles] = useState<MockFileNode[]>(initialFiles)
  const [clipboardPath, setClipboardPathState] = useState<string | null>('/Pictures/emoji-board.png')
  const [pickedFiles, setPickedFilesState] = useState<string[]>(['/Downloads/mock-note.txt'])
  const [recentEvents, setRecentEvents] = useState<MockOpenEvent[]>([])
  const [peers, setPeers] = useState(initialPeers)
  const [openedPeerId, setOpenedPeerId] = useState<string | null>('peer-mac')
  const [scanLogs, setScanLogs] = useState<string[]>(['discover peer 192.168.1.20', 'sync digest 3 conversations', 'rebuild list done'])
  const [isScanLogsPresented, setIsScanLogsPresented] = useState(false)
  const [messagesByPeer, setMessagesByPeer] = useState<Record<string, ChatMessage[]>>(initialMessages)

  const pushEvent = (event: MockOpenEvent) => {
    setRecentEvents(prev => [event, ...prev].slice(0, 12))
  }

  const listFolder = (path: string) => {
    const node = findNode(files, path)
    return node?.children ?? []
  }

  const createFile = (folderPath: string, file: Omit<MockFileNode, 'path'>) => {
    setFiles(prev =>
      updateNode(prev, folderPath, folder => {
        const childPath = joinPath(folder.path, file.fileName)
        const nextChild: MockFileNode = {
          ...file,
          path: uniquePath(folder.children ?? [], childPath, file.fileName),
          children: file.kind === 'folder' ? [] : undefined,
        }
        return {
          ...folder,
          children: [...(folder.children ?? []), nextChild],
        }
      }),
    )
  }

  const renamePath = (path: string, nextFileName: string) => {
    setFiles(prev => renameNode(prev, path, nextFileName))
  }

  const removePath = (path: string) => {
    setFiles(prev => removeNode(prev, path))
  }

  const makeDownloadRoot = () => '/Downloads'

  const systemApi: AppSystemApi = useMemo(
    () => ({
      loadIdentity: () => identity,
      renameDevice: (currentIdentity, to) => {
        const trimmed = to.trim()
        if (!trimmed || trimmed === currentIdentity.deviceName) {
          return null
        }
        const next = { ...currentIdentity, deviceName: trimmed }
        setIdentity(next)
        return next
      },
      makeDownloadRoot,
      pickFiles: () => pickedFiles,
      clipboardImage: () => (clipboardPath ? findNode(files, clipboardPath) ?? null : null),
      openUrl: url => {
        pushEvent({ kind: 'url', url })
      },
    }),
    [clipboardPath, files, identity, pickedFiles],
  )

  const fileApi: AppFileApi = useMemo(
    () => ({
      readMessageData: message => {
        if (!message.filePath) {
          return null
        }
        return findNode(files, message.filePath)?.data ?? null
      },
      prepareOutgoingFile: url => {
        const node = findNode(files, url)
        if (!node || node.kind === 'folder') {
          return null
        }
        return {
          url,
          fileName: node.fileName,
          fileSize: node.data.length,
          kind: node.kind === 'image' ? 'image' : 'file',
          mimeType: node.mimeType,
          data: node.data,
        }
      },
      documentByPath: path => {
        const node = findNode(files, path)
        if (!node || node.kind === 'folder') {
          return null
        }
        return node
      },
      saveIncomingFile: (peerDeviceId, kind, fileName, data) => {
        const folderPath = `/Downloads/${peerDeviceId}/${kind === 'image' ? 'images' : 'files'}`
        ensureFolder(folderPath, setFiles)
        createFile(folderPath, {
          fileName,
          kind: kind === 'image' ? 'image' : 'file',
          mimeType: kind === 'image' ? 'image/png' : 'application/octet-stream',
          data,
        })
        return {
          path: `${folderPath}/${fileName}`,
          size: data.length,
        }
      },
      ensureSavedAttachment: message => {
        if (!message.filePath || !message.fileName) {
          return null
        }
        const source = findNode(files, message.filePath)
        if (!source || source.kind === 'folder') {
          return null
        }
        const folderPath = `/Downloads/${message.conversationId}/${message.kind === 'image' ? 'images' : 'files'}`
        ensureFolder(folderPath, setFiles)
        createFile(folderPath, {
          fileName: message.fileName,
          kind: source.kind,
          mimeType: source.mimeType,
          data: source.data,
        })
        return `${folderPath}/${message.fileName}`
      },
      revealAttachment: message => {
        if (message.filePath) {
          pushEvent({ kind: 'reveal', path: message.filePath })
        }
      },
      revealPath: path => {
        pushEvent({ kind: 'reveal', path })
      },
      openAttachment: message => {
        if (message.filePath) {
          pushEvent({ kind: 'open', path: message.filePath })
        }
      },
      filePreview: (kind, fileName) => (kind === 'image' ? `[图片] ${fileName}` : `[文件] ${fileName}`),
      messagePreview: message => {
        if (message.status === 'revoked') {
          return '[已撤回]'
        }
        if (message.kind === 'text') {
          return message.textContent ?? ''
        }
        return message.fileName ? (message.kind === 'image' ? `[图片] ${message.fileName}` : `[文件] ${message.fileName}`) : 'file'
      },
    }),
    [createFile, files],
  )

  const peerDigests = useMemo<PeerDigest[]>(
    () =>
      peers.map(peer => ({
        peer,
        lastMessagePreview: fileApi.messagePreview(
          messagesByPeer[peer.deviceId]?.[messagesByPeer[peer.deviceId].length - 1] ?? {
            messageId: `empty-${peer.deviceId}`,
            conversationId: peer.deviceId,
            kind: 'text',
            status: 'sent',
            textContent: '',
          },
        ),
      })),
    [fileApi, messagesByPeer, peers],
  )

  const openedDigest = peerDigests.find(item => item.peer.deviceId === openedPeerId) ?? null

  const appShell = useMemo<AppShell>(
    () => ({
      deviceId: identity.deviceId,
      deviceName: identity.deviceName,
      logDogVersion: 1,
      peerDigests,
      openedDigest,
      openedPeerId,
      isScanLogsPresented,
      scanLogs,
      downloadRoot: makeDownloadRoot(),
      localAccessAddress: '192.168.1.8:50321',
      setScanLogsPresented: isPresented => setIsScanLogsPresented(isPresented),
      openPeer: peerDeviceId => setOpenedPeerId(peerDeviceId),
      closeOpenedPeer: () => setOpenedPeerId(null),
      scanNow: () =>
        setScanLogs(prev => [`scan at ${new Date().toLocaleTimeString()}`, 'discover peer 192.168.1.33', ...prev].slice(0, 8)),
      renameDevice: to => {
        const next = systemApi.renameDevice(systemApi.loadIdentity(), to)
        if (next) {
          setIdentity(next)
        }
      },
      togglePinned: peerDeviceId =>
        setPeers(prev =>
          prev.map(peer =>
            peer.deviceId === peerDeviceId
              ? {
                  ...peer,
                  pinnedAt: peer.pinnedAt == null ? Date.now() : null,
                }
              : peer,
          ),
        ),
      hidePeer: peerDeviceId => {
        setPeers(prev => prev.filter(peer => peer.deviceId !== peerDeviceId))
        setOpenedPeerId(prev => (prev === peerDeviceId ? null : prev))
      },
      clearChat: peerDeviceId =>
        setMessagesByPeer(prev => ({
          ...prev,
          [peerDeviceId]: [],
        })),
      messages: peerDeviceId => messagesByPeer[peerDeviceId] ?? [],
      sendText: (to, text) => {
        const trimmed = text.trim()
        if (!trimmed) {
          return
        }
        const nextMessage: ChatMessage = {
          messageId: `m-${Date.now()}`,
          conversationId: to.deviceId,
          kind: 'text',
          status: to.isOnline ? 'sent' : 'pending',
          textContent: trimmed,
        }
        setMessagesByPeer(prev => ({
          ...prev,
          [to.deviceId]: [...(prev[to.deviceId] ?? []), nextMessage],
        }))
      },
      chooseFilesAndSend: to => {
        const paths = systemApi.pickFiles()
        const nextMessages: ChatMessage[] = paths
          .map(path => fileApi.prepareOutgoingFile(path))
          .filter((item): item is OutgoingFile => Boolean(item))
          .map(file => ({
            messageId: `m-${Date.now()}-${file.fileName}`,
            conversationId: to.deviceId,
            kind: file.kind,
            status: to.isOnline ? 'sent' : 'pending',
            filePath: file.url,
            fileName: file.fileName,
          }))
        if (!nextMessages.length) {
          return
        }
        setMessagesByPeer(prev => ({
          ...prev,
          [to.deviceId]: [...(prev[to.deviceId] ?? []), ...nextMessages],
        }))
      },
      sendClipboardImageFromPasteboard: to => {
        const image = systemApi.clipboardImage()
        if (!image) {
          return
        }
        pushEvent({ kind: 'clipboard', path: image.path })
        const nextMessage: ChatMessage = {
          messageId: `m-${Date.now()}-clipboard`,
          conversationId: to.deviceId,
          kind: 'image',
          status: to.isOnline ? 'sent' : 'pending',
          filePath: image.path,
          fileName: image.fileName,
        }
        setMessagesByPeer(prev => ({
          ...prev,
          [to.deviceId]: [...(prev[to.deviceId] ?? []), nextMessage],
        }))
      },
      saveMessageAttachment: message => fileApi.ensureSavedAttachment(message),
      revealMessageAttachment: message => fileApi.revealAttachment(message),
      openMessageAttachment: message => fileApi.openAttachment(message),
      openDirectory: url => pushEvent({ kind: 'directory', path: url }),
    }),
    [
      fileApi,
      identity,
      isScanLogsPresented,
      messagesByPeer,
      openedDigest,
      openedPeerId,
      peerDigests,
      scanLogs,
      systemApi,
    ],
  )

  const value = useMemo<MockEnvironment>(
    () => ({
      identity,
      downloadRoot: makeDownloadRoot(),
      files,
      recentEvents,
      systemApi,
      fileApi,
      createFile,
      renamePath,
      removePath,
      listFolder,
      setClipboardPath: setClipboardPathState,
      setPickedFiles: setPickedFilesState,
      appShell,
    }),
    [appShell, createFile, fileApi, files, identity, recentEvents, systemApi],
  )

  return <MockEnvironmentContext.Provider value={value}>{children}</MockEnvironmentContext.Provider>
}

export const useMockEnvironment = (): MockEnvironment => {
  const value = useContext(MockEnvironmentContext)
  if (!value) {
    throw new Error('useMockEnvironment must be called inside MockEnvironmentProvider')
  }
  return value
}

export const useMockAppShell = (): AppShell => {
  return useMockEnvironment().appShell
}
