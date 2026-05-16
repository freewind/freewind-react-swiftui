import {
  createContext,
  useContext,
  useMemo,
  useState,
  type Dispatch,
  type FC,
  type PropsWithChildren,
  type ReactNode,
  type SetStateAction,
} from 'react'

export type MessageKind = 'text' | 'image' | 'file'

export type DeviceIdentity = {
  deviceId: string
  deviceName: string
}

export type Peer = {
  deviceId: string
  deviceName: string
  platform: 'macos' | 'ios'
  isOnline: boolean
  pinnedAt: number | null
}

export type PeerDigest = {
  peer: Peer
  lastMessagePreview: string
}

export type MockFileNode = {
  path: string
  fileName: string
  kind: 'folder' | 'file' | 'image'
  mimeType: string
  data: string
  children?: MockFileNode[]
}

export type ChatMessage = {
  messageId: string
  conversationId: string
  kind: MessageKind
  status: 'pending' | 'sending' | 'sent' | 'failed' | 'saved' | 'receiving' | 'revoked'
  filePath?: string
  fileName?: string
  textContent?: string
}

export type OutgoingFile = {
  url: string
  fileName: string
  fileSize: number
  kind: MessageKind
  mimeType: string
  data: string
}

export type MockOpenEvent =
  | { kind: 'open'; path: string }
  | { kind: 'reveal'; path: string }
  | { kind: 'directory'; path: string }
  | { kind: 'clipboard'; path: string }

export type AppSystemApi = {
  loadIdentity: () => DeviceIdentity
  renameDevice: (currentIdentity: DeviceIdentity, to: string) => DeviceIdentity | null
  makeDownloadRoot: () => string
  pickFiles: () => string[]
  clipboardImage: () => MockFileNode | null
}

export type AppFileApi = {
  readMessageData: (message: ChatMessage) => string | null
  prepareOutgoingFile: (url: string) => OutgoingFile | null
  saveIncomingFile: (peerDeviceId: string, kind: MessageKind, fileName: string, data: string) => { path: string; size: number }
  ensureSavedAttachment: (message: ChatMessage) => string | null
  revealAttachment: (message: ChatMessage) => void
  revealPath: (path: string) => void
  openAttachment: (message: ChatMessage) => void
  filePreview: (kind: MessageKind, fileName: string) => string
  messagePreview: (message: ChatMessage) => string
}

export type MockEnvironment = {
  identity: DeviceIdentity
  downloadRoot: string
  files: MockFileNode[]
  recentEvents: MockOpenEvent[]
  systemApi: AppSystemApi
  fileApi: AppFileApi
  createFile: (folderPath: string, file: Omit<MockFileNode, 'path'>) => void
  renamePath: (path: string, nextFileName: string) => void
  removePath: (path: string) => void
  listFolder: (path: string) => MockFileNode[]
  setClipboardPath: (path: string | null) => void
  setPickedFiles: (paths: string[]) => void
  appShell: AppShell
}

export type AppShell = {
  deviceId: string
  deviceName: string
  logDogVersion: number
  peerDigests: PeerDigest[]
  openedDigest: PeerDigest | null
  openedPeerId: string | null
  isScanLogsPresented: boolean
  scanLogs: string[]
  downloadRoot: string
  localAccessAddress: string
  setScanLogsPresented: (isPresented: boolean) => void
  openPeer: (peerDeviceId: string) => void
  closeOpenedPeer: () => void
  scanNow: () => void
  renameDevice: (to: string) => void
  togglePinned: (peerDeviceId: string) => void
  hidePeer: (peerDeviceId: string) => void
  clearChat: (peerDeviceId: string) => void
  messages: (peerDeviceId: string) => ChatMessage[]
  sendText: (to: Peer, text: string) => void
  chooseFilesAndSend: (to: Peer) => void
  sendClipboardImageFromPasteboard: (to: Peer) => void
  saveMessageAttachment: (message: ChatMessage) => string | null
  revealMessageAttachment: (message: ChatMessage) => void
  openMessageAttachment: (message: ChatMessage) => void
  openDirectory: (url: string) => void
}

type MockEnvironmentProviderProps = PropsWithChildren

const initialFiles: MockFileNode[] = [
  {
    path: '/Downloads',
    fileName: 'Downloads',
    kind: 'folder',
    mimeType: 'inode/directory',
    data: '',
    children: [
      {
        path: '/Downloads/peer-mac',
        fileName: 'peer-mac',
        kind: 'folder',
        mimeType: 'inode/directory',
        data: '',
        children: [
          {
            path: '/Downloads/peer-mac/images',
            fileName: 'images',
            kind: 'folder',
            mimeType: 'inode/directory',
            data: '',
            children: [
              {
                path: '/Downloads/peer-mac/images/sunrise.png',
                fileName: 'sunrise.png',
                kind: 'image',
                mimeType: 'image/png',
                data: 'mock-image-sunrise',
              },
            ],
          },
          {
            path: '/Downloads/peer-mac/files',
            fileName: 'files',
            kind: 'folder',
            mimeType: 'inode/directory',
            data: '',
            children: [
              {
                path: '/Downloads/peer-mac/files/brief.md',
                fileName: 'brief.md',
                kind: 'file',
                mimeType: 'text/markdown',
                data: '# brief',
              },
            ],
          },
        ],
      },
      {
        path: '/Downloads/mock-note.txt',
        fileName: 'mock-note.txt',
        kind: 'file',
        mimeType: 'text/plain',
        data: 'hello mock fs',
      },
    ],
  },
  {
    path: '/Pictures',
    fileName: 'Pictures',
    kind: 'folder',
    mimeType: 'inode/directory',
    data: '',
    children: [
      {
        path: '/Pictures/emoji-board.png',
        fileName: 'emoji-board.png',
        kind: 'image',
        mimeType: 'image/png',
        data: 'mock-image-emoji',
      },
    ],
  },
]

const initialPeers: Peer[] = [
  {
    deviceId: 'peer-mac',
    deviceName: 'MacBook Pro',
    platform: 'macos',
    isOnline: true,
    pinnedAt: Date.now(),
  },
  {
    deviceId: 'peer-ios',
    deviceName: 'iPhone 16',
    platform: 'ios',
    isOnline: false,
    pinnedAt: null,
  },
  {
    deviceId: 'peer-test',
    deviceName: '测试机',
    platform: 'ios',
    isOnline: true,
    pinnedAt: null,
  },
]

const initialMessages: Record<string, ChatMessage[]> = {
  'peer-mac': [
    {
      messageId: 'm1',
      conversationId: 'peer-mac',
      kind: 'text',
      status: 'sent',
      textContent: '这个方向对，先做受限 DSL。',
    },
    {
      messageId: 'm2',
      conversationId: 'peer-mac',
      kind: 'file',
      status: 'sent',
      filePath: '/Downloads/peer-mac/files/brief.md',
      fileName: 'brief.md',
    },
    {
      messageId: 'm3',
      conversationId: 'peer-mac',
      kind: 'image',
      status: 'saved',
      filePath: '/Downloads/peer-mac/images/sunrise.png',
      fileName: 'sunrise.png',
    },
  ],
  'peer-ios': [
    {
      messageId: 'm4',
      conversationId: 'peer-ios',
      kind: 'text',
      status: 'pending',
      textContent: '离线待发送',
    },
  ],
  'peer-test': [
    {
      messageId: 'm5',
      conversationId: 'peer-test',
      kind: 'text',
      status: 'sent',
      textContent: '文件传输完成',
    },
  ],
}

const createInitialIdentity = (): DeviceIdentity => ({
  deviceId: 'mock-device-001',
  deviceName: 'macos-device',
})

const MockEnvironmentContext = createContext<MockEnvironment | null>(null)

export const MockEnvironmentProvider: FC<MockEnvironmentProviderProps & { children: ReactNode }> = ({ children }) => {
  const [identity, setIdentity] = useState<DeviceIdentity>(createInitialIdentity())
  const [files, setFiles] = useState<MockFileNode[]>(initialFiles)
  const [clipboardPath, setClipboardPathState] = useState<string | null>('/Pictures/emoji-board.png')
  const [pickedFiles, setPickedFilesState] = useState<string[]>(['/Downloads/mock-note.txt'])
  const [recentEvents, setRecentEvents] = useState<MockOpenEvent[]>([])
  const [peers, setPeers] = useState<Peer[]>(initialPeers)
  const [openedPeerId, setOpenedPeerId] = useState<string | null>('peer-mac')
  const [scanLogs, setScanLogs] = useState<string[]>(['discover peer 192.168.1.20', 'sync digest 3 conversations', 'rebuild list done'])
  const [isScanLogsPresented, setIsScanLogsPresented] = useState(true)
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

const findNode = (nodes: MockFileNode[], path: string): MockFileNode | null => {
  for (const node of nodes) {
    if (node.path === path) {
      return node
    }
    if (node.children) {
      const hit = findNode(node.children, path)
      if (hit) {
        return hit
      }
    }
  }
  return null
}

const updateNode = (
  nodes: MockFileNode[],
  path: string,
  updater: (node: MockFileNode) => MockFileNode,
): MockFileNode[] => {
  return nodes.map(node => {
    if (node.path === path) {
      return updater(node)
    }
    if (node.children) {
      return {
        ...node,
        children: updateNode(node.children, path, updater),
      }
    }
    return node
  })
}

const removeNode = (nodes: MockFileNode[], path: string): MockFileNode[] => {
  return nodes
    .filter(node => node.path !== path)
    .map(node => ({
      ...node,
      children: node.children ? removeNode(node.children, path) : undefined,
    }))
}

const renameNode = (nodes: MockFileNode[], path: string, nextFileName: string): MockFileNode[] => {
  return nodes.map(node => {
    if (node.path === path) {
      const nextPath = joinPath(parentPath(path), nextFileName)
      return rewriteSubtreePath({ ...node, fileName: nextFileName, path: nextPath }, path, nextPath)
    }
    if (node.children) {
      return {
        ...node,
        children: renameNode(node.children, path, nextFileName),
      }
    }
    return node
  })
}

const rewriteSubtreePath = (node: MockFileNode, prevRoot: string, nextRoot: string): MockFileNode => {
  return {
    ...node,
    path: node.path.replace(prevRoot, nextRoot),
    children: node.children?.map(child => rewriteSubtreePath(child, prevRoot, nextRoot)),
  }
}

const parentPath = (path: string) => {
  const parts = path.split('/')
  return parts.slice(0, -1).join('/') || '/'
}

const joinPath = (base: string, fileName: string) => {
  return `${base.replace(/\/$/, '')}/${fileName}`
}

const uniquePath = (siblings: MockFileNode[], targetPath: string, fileName: string) => {
  if (!siblings.some(node => node.path === targetPath)) {
    return targetPath
  }
  const dot = fileName.lastIndexOf('.')
  const base = dot >= 0 ? fileName.slice(0, dot) : fileName
  const ext = dot >= 0 ? fileName.slice(dot) : ''
  let index = 1
  while (true) {
    const nextName = `${base}-${index}${ext}`
    const nextPath = joinPath(parentPath(targetPath), nextName)
    if (!siblings.some(node => node.path === nextPath)) {
      return nextPath
    }
    index += 1
  }
}

const ensureFolder = (path: string, setFiles: Dispatch<SetStateAction<MockFileNode[]>>) => {
  setFiles(prev => {
    if (findNode(prev, path)) {
      return prev
    }
    const parts = path.split('/').filter(Boolean)
    let next = prev
    let currentPath = ''
    for (const part of parts) {
      currentPath = `${currentPath}/${part}`
      if (!findNode(next, currentPath)) {
        const parent = parentPath(currentPath)
        if (parent === '/') {
          next = [
            ...next,
            { path: currentPath, fileName: part, kind: 'folder', mimeType: 'inode/directory', data: '', children: [] },
          ]
        } else {
          next = updateNode(next, parent, folder => ({
            ...folder,
            children: [
              ...(folder.children ?? []),
              { path: currentPath, fileName: part, kind: 'folder', mimeType: 'inode/directory', data: '', children: [] },
            ],
          }))
        }
      }
    }
    return next
  })
}
