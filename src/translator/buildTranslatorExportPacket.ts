import type { TranslatorExportPacket } from './types'

const baseConstraints = [
  '业务层禁原生 DOM 标签，优先走 src/swift DSL 组件。',
  '真实 IO 不直连，文件/系统/打开 URL 优先走 mock facade。',
  '状态优先表达为 State/Binding/EnvironmentObject/FocusedValues。',
  '输出目标是 SwiftUI，可接受 stub，但参数/用法应尽量贴近 SwiftUI/OpenSwiftUI。',
]

const baseMappings = [
  { jsx: '<VStack spacing={12}>', swiftui: 'VStack(spacing: 12) { ... }' },
  { jsx: '<TextField text={name} />', swiftui: 'TextField("", text: $name)' },
  { jsx: '<DocumentGroup documents={docs} selection={selection} />', swiftui: 'DocumentGroup { ... }' },
  { jsx: '<NavigationLink value="detail" />', swiftui: 'NavigationLink(value: "detail") { ... }' },
]

const packets: Record<string, TranslatorExportPacket> = {
  translator: {
    page: {
      id: 'translator',
      title: '转换规约',
      intent: '给 AE/AI 一份稳定的 JSX -> SwiftUI 结构化输入包。',
    },
    constraints: baseConstraints,
    mappings: baseMappings,
    stateModels: ['Binding<T>', 'ObservableObject<T>', 'NavigationPath', 'FileDocument'],
    apiFacades: ['MockEnvironment', 'AppShell', 'AppSystemApi', 'AppFileApi'],
    components: ['Text', 'Button', 'VStack', 'HStack', 'DocumentGroup', 'NavigationStack', 'List', 'Table'],
    modifiers: ['padding', 'frame', 'background', 'foregroundStyle', 'tint', 'controlSize', 'lineLimit', 'labelsHidden'],
    fewShot: [
      'JSX: <Toggle isOn={wifi} title="Wi-Fi" /> -> SwiftUI: Toggle("Wi-Fi", isOn: $wifi)',
      'JSX: <Sheet isPresented={shown}>...</Sheet> -> SwiftUI: .sheet(isPresented: $shown) { ... }',
    ],
    prompt:
      '你是 SwiftUI 转换器。基于 packet 把 JSX DSL 转成 SwiftUI，优先保留状态 shape、容器结构、modifier 顺序、系统 facade 边界。',
    jsxSource: [
      '<VStack spacing={18}>',
      '  <DocumentGroup documents={documents} selection={selection}>',
      '    <NavigationStack path={path}>',
      '      <List selection={selectedRow}>...</List>',
      '    </NavigationStack>',
      '  </DocumentGroup>',
      '</VStack>',
    ].join('\n'),
  },
  'native-swift-root-view': {
    page: {
      id: 'native-swift-root-view',
      title: 'RootView',
      intent: '把真实 Swift RootView 对照为可转 SwiftUI 的 JSX/mock 壳。',
    },
    constraints: baseConstraints,
    mappings: baseMappings,
    stateModels: ['Binding<Int>', 'NavigationPath', 'MockEnvironment', 'AppShell'],
    apiFacades: ['AppShell', 'AppSystemApi', 'AppFileApi'],
    components: ['NavigationStack', 'List', 'Picker', 'Text', 'Button', 'HStack', 'VStack'],
    modifiers: ['padding', 'frame', 'background', 'foregroundStyle', 'tint', 'controlSize'],
    fewShot: [
      'Swift RootView 联系人侧栏 -> JSX HStack + VStack + Picker + mock app shell',
      'Swift NavigationSplit-ish layout -> JSX HStack + detail pane',
    ],
    prompt:
      '把 RootView.swift 对照成 SwiftUI/JSX 双向稳定表示，保留侧栏、选择态、mock facade 边界，不要引入真实 IO。',
    jsxSource: [
      '<HStack spacing={0}>',
      '  <ContactsPaneMini />',
      '  <Divider axis="vertical" />',
      '  <ChatPanel draft={draft} />',
      '</HStack>',
    ].join('\n'),
  },
  'native-swift-chat-screen': {
    page: {
      id: 'native-swift-chat-screen',
      title: 'ChatScreen',
      intent: '把真实聊天页结构映射到 JSX DSL 与 SwiftUI draft。',
    },
    constraints: baseConstraints,
    mappings: baseMappings,
    stateModels: ['Binding<String>', 'ChatMessage[]', 'PeerDigest', 'FocusedValues'],
    apiFacades: ['AppShell', 'AppFileApi'],
    components: ['ScrollView', 'TextEditor', 'Button', 'Sheet', 'Popover', 'NavigationLink'],
    modifiers: ['padding', 'frame', 'background', 'lineLimit', 'labelsHidden'],
    fewShot: [
      '消息列表 -> ScrollView + VStack + message row',
      '附件弹层 -> Sheet/Popover + mock save/open facade',
    ],
    prompt:
      '把 ChatScreen.swift 转成结构稳定的 SwiftUI/JSX，对消息列表、输入区、附件动作优先保留状态和 facade 边界。',
    jsxSource: [
      '<VStack spacing={0}>',
      '  <ScrollView>...</ScrollView>',
      '  <Divider />',
      '  <TextEditor text={draft} />',
      '</VStack>',
    ].join('\n'),
  },
  'native-swift-composer-text-view': {
    page: {
      id: 'native-swift-composer-text-view',
      title: 'ComposerTextView',
      intent: '把真实输入框桥接层压缩为 DSL 可表达的输入语义。',
    },
    constraints: baseConstraints,
    mappings: baseMappings,
    stateModels: ['Binding<String>', 'FocusedValues', 'FocusState<String | null>'],
    apiFacades: ['AppSystemApi'],
    components: ['TextEditor', 'TextField', 'Button', 'Popover'],
    modifiers: ['tint', 'controlSize', 'lineLimit'],
    fewShot: [
      'NSTextView bridge -> TextEditor + FocusState + submit/draft state',
      '快捷动作按钮 -> Button + Popover',
    ],
    prompt:
      '把 ComposerTextView.swift 提炼成输入控件 DSL，优先保留 focus、draft、submit 与系统能力边界。',
    jsxSource: [
      '<VStack spacing={8}>',
      '  <TextEditor text={draft} focused={focus} equals="composer" />',
      '  <HStack><Button title="Send" /></HStack>',
      '</VStack>',
    ].join('\n'),
  },
}

export const buildTranslatorExportPacket = (pageId: string): TranslatorExportPacket => {
  return packets[pageId] ?? packets.translator
}
