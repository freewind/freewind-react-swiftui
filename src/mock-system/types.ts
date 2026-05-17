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
  | { kind: 'url'; url: string }

export type AppSystemApi = {
  loadIdentity: () => DeviceIdentity
  renameDevice: (currentIdentity: DeviceIdentity, to: string) => DeviceIdentity | null
  makeDownloadRoot: () => string
  pickFiles: () => string[]
  clipboardImage: () => MockFileNode | null
  openUrl: (url: string) => void
}

export type AppFileApi = {
  readMessageData: (message: ChatMessage) => string | null
  prepareOutgoingFile: (url: string) => OutgoingFile | null
  documentByPath: (path: string) => MockFileNode | null
  saveIncomingFile: (peerDeviceId: string, kind: MessageKind, fileName: string, data: string) => { path: string; size: number }
  ensureSavedAttachment: (message: ChatMessage) => string | null
  revealAttachment: (message: ChatMessage) => void
  revealPath: (path: string) => void
  openAttachment: (message: ChatMessage) => void
  filePreview: (kind: MessageKind, fileName: string) => string
  messagePreview: (message: ChatMessage) => string
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
