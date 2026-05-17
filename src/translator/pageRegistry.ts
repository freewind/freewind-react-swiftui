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
  {
    id: 'component-document-group',
    title: 'DocumentGroup',
    intent: '展示 document open/save/new/select 生命周期与 mock fs 边界。',
    category: 'component',
  },
  {
    id: 'component-window-group',
    title: 'WindowGroup',
    intent: '展示 window chrome、key window、open/close 生命周期 stub。',
    category: 'component',
  },
  {
    id: 'component-commands',
    title: 'Commands',
    intent: '展示 command group 注册与命令触发行为 stub。',
    category: 'component',
  },
  {
    id: 'component-scene',
    title: 'Scene',
    intent: '展示 scene role 与 phase/lifecycle stub。',
    category: 'component',
  },
  {
    id: 'component-navigation-stack',
    title: 'NavigationStack',
    intent: '展示 path/value-driven 导航与本地栈状态。',
    category: 'component',
  },
  {
    id: 'component-list',
    title: 'List',
    intent: '展示 plain/insetGrouped、selection 与 section 组合。',
    category: 'component',
  },
  {
    id: 'component-sheet',
    title: 'Sheet',
    intent: '展示 detents、dismiss、modal 生命周期 stub。',
    category: 'component',
  },
  {
    id: 'component-popover',
    title: 'Popover',
    intent: '展示 title/arrowEdge/quick action 浮层语义。',
    category: 'component',
  },
  {
    id: 'component-table',
    title: 'Table',
    intent: '展示 column/selection/rowActions 数据表语义。',
    category: 'component',
  },
  {
    id: 'component-text-field',
    title: 'TextField',
    intent: '展示 focus/submit/tint/controlSize 文本输入语义。',
    category: 'component',
  },
  {
    id: 'component-text-editor',
    title: 'TextEditor',
    intent: '展示多行输入、focus、高度与 draft state。',
    category: 'component',
  },
]

export const getTranslatorPageMeta = (pageId: string): TranslatorPageMeta | undefined => {
  return translatorPageRegistry.find(item => item.id === pageId)
}
