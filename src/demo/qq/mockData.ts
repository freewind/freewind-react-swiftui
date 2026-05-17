import type { ChatMessage, DeviceIdentity, MockFileNode, Peer } from '../../mock-system/types'

export const initialFiles: MockFileNode[] = [
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

export const initialPeers: Peer[] = [
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

export const initialMessages: Record<string, ChatMessage[]> = {
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

export const createInitialIdentity = (): DeviceIdentity => ({
  deviceId: 'mock-device-001',
  deviceName: 'macos-device',
})
