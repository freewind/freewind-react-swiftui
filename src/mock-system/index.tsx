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
    }),
    [createFile, fileApi, files, identity, recentEvents, systemApi],
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
