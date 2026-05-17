import rootViewSwiftSource from '/Users/peng.li/workspace/freewind-qq/native/macos/Sources/FreewindQQMac/Features/RootView.swift?raw'
import chatScreenSwiftSource from '/Users/peng.li/workspace/freewind-qq/native/macos/Sources/FreewindQQMac/Features/ChatScreen.swift?raw'
import composerTextViewSwiftSource from '/Users/peng.li/workspace/freewind-qq/native/macos/Sources/FreewindQQMac/ComposerTextView.swift?raw'

export type TranslatorPageMeta = {
  id: string
  title: string
  intent: string
  category: 'translator' | 'native-swift' | 'app' | 'component'
  swiftSource?: string
}

export const translatorPageRegistry: TranslatorPageMeta[] = [
  {
    id: 'translator',
    title: '转换规约',
    intent: '给 AE/AI 一份稳定的 JSX -> SwiftUI 结构化输入包。',
    category: 'translator',
  },
  {
    id: 'native-swift-root-view',
    title: 'RootView',
    intent: '把真实 Swift RootView 对照为可转 SwiftUI 的 JSX/mock 壳。',
    category: 'native-swift',
    swiftSource: rootViewSwiftSource,
  },
  {
    id: 'native-swift-chat-screen',
    title: 'ChatScreen',
    intent: '把真实聊天页结构映射到 JSX DSL 与 SwiftUI draft。',
    category: 'native-swift',
    swiftSource: chatScreenSwiftSource,
  },
  {
    id: 'native-swift-composer-text-view',
    title: 'ComposerTextView',
    intent: '把真实输入框桥接层压缩为 DSL 可表达的输入语义。',
    category: 'native-swift',
    swiftSource: composerTextViewSwiftSource,
  },
  {
    id: 'qq',
    title: 'QQ Chat',
    intent: '把聊天应用壳、联系人、消息列表、输入区转成 SwiftUI 稳定结构。',
    category: 'app',
  },
  {
    id: 'system-api',
    title: 'System API Mock',
    intent: '把 system/file/open-url/mock fs 操作导出给 AI 做 SwiftUI facade 映射。',
    category: 'app',
  },
  {
    id: 'component-runtime-state',
    title: 'Runtime State',
    intent: '展示 DynamicProperty 兼容面，供 SwiftUI 状态映射参考。',
    category: 'component',
  },
]

export const getTranslatorPageMeta = (pageId: string): TranslatorPageMeta | undefined => {
  return translatorPageRegistry.find(item => item.id === pageId)
}
