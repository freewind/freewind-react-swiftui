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
}

export const buildTranslatorExportPacket = (pageId: string): TranslatorExportPacket => {
  return packets[pageId] ?? packets.translator
}
