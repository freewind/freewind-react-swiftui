import type { TranslatorExportPacket } from './types'
import { getTranslatorPageMeta } from './pageRegistry'

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
    page: getTranslatorPageMeta('translator')!,
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
    page: getTranslatorPageMeta('native-swift-root-view')!,
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
    page: getTranslatorPageMeta('native-swift-chat-screen')!,
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
    page: getTranslatorPageMeta('native-swift-composer-text-view')!,
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
  qq: {
    page: getTranslatorPageMeta('qq')!,
    constraints: baseConstraints,
    mappings: baseMappings,
    stateModels: ['Binding<number>', 'Binding<string>', 'PeerDigest[]', 'ChatMessage[]'],
    apiFacades: ['AppShell', 'AppSystemApi', 'AppFileApi', 'MockEnvironment'],
    components: ['HStack', 'VStack', 'ScrollView', 'Picker', 'TextEditor', 'Sheet', 'Button', 'List'],
    modifiers: ['padding', 'frame', 'background', 'foregroundStyle', 'tint', 'controlSize', 'lineLimit'],
    fewShot: [
      '联系人列表 -> ScrollView + peer row',
      '输入区 -> TextEditor + toolbar style buttons',
    ],
    prompt:
      '把 QQ demo 提炼成 SwiftUI 兼容壳，优先保留 app shell facade、消息状态、附件动作与分栏布局。',
    jsxSource: [
      '<HStack spacing={0}>',
      '  <ContactsPaneMini />',
      '  <Divider axis="vertical" />',
      '  <ChatPanel draft={draft} />',
      '</HStack>',
    ].join('\n'),
  },
  'system-api': {
    page: getTranslatorPageMeta('system-api')!,
    constraints: baseConstraints,
    mappings: baseMappings,
    stateModels: ['MockEnvironment', 'MockFileNode[]', 'MockOpenEvent[]'],
    apiFacades: ['AppSystemApi', 'AppFileApi', 'MockEnvironment'],
    components: ['FormSection', 'Button', 'TextField', 'List', 'ScrollView', 'Text'],
    modifiers: ['padding', 'frame', 'background', 'foregroundStyle', 'labelsHidden'],
    fewShot: [
      'openUrl -> system facade event',
      'fake fs create/delete/reveal -> in-memory file tree update',
    ],
    prompt:
      '把 system api mock 页面转成 SwiftUI 管理台，保留 fake fs、recent events、open/reveal/url facade。',
    jsxSource: [
      '<VStack spacing={18}>',
      '  <Button title="Create File" />',
      '  <List>recent events...</List>',
      '</VStack>',
    ].join('\n'),
  },
  'component-runtime-state': {
    page: getTranslatorPageMeta('component-runtime-state')!,
    constraints: baseConstraints,
    mappings: baseMappings,
    stateModels: ['StateObject', 'ObservedObject', 'EnvironmentObject', 'FocusedValues'],
    apiFacades: ['SceneLifecycleProvider'],
    components: ['EnvironmentObjectProvider', 'FocusedValuesProvider', 'Button', 'Text', 'VStack'],
    modifiers: ['padding', 'background', 'frame', 'foregroundStyle'],
    fewShot: [
      'EnvironmentObject provider -> child read',
      'FocusedValues -> focus driven derived label',
    ],
    prompt:
      '把 runtime state demo 当成 SwiftUI 状态映射 reference，保留 provider 与 dynamic property 关系。',
    jsxSource: [
      '<EnvironmentObjectProvider>',
      '  <FocusedValuesProvider>...</FocusedValuesProvider>',
      '</EnvironmentObjectProvider>',
    ].join('\n'),
  },
  'component-document-group': {
    page: getTranslatorPageMeta('component-document-group')!,
    constraints: baseConstraints,
    mappings: baseMappings,
    stateModels: ['FileDocument[]', 'Binding<string | null>', 'MockDocumentWorkspace'],
    apiFacades: ['MockEnvironment', 'AppFileApi'],
    components: ['DocumentGroup', 'TextField', 'Button', 'Picker', 'ScrollView'],
    modifiers: ['padding', 'frame', 'background', 'controlSize'],
    fewShot: [
      'open/save/new/select document -> DocumentGroup + mock workspace',
      'mock fs rename/delete -> environment facade',
    ],
    prompt:
      '把 DocumentGroup demo 提炼成 SwiftUI 文档工作区，保留 open/save/new/select 生命周期与 mock fs 边界。',
    jsxSource: [
      '<DocumentGroup documents={documents} selection={selection}>',
      '  <TextField text={nextName} />',
      '  <Button title="Save" />',
      '</DocumentGroup>',
    ].join('\n'),
  },
  'component-window-group': {
    page: getTranslatorPageMeta('component-window-group')!,
    constraints: baseConstraints,
    mappings: baseMappings,
    stateModels: ['MockWindowInfo[]', 'MockSceneLifecycle'],
    apiFacades: ['SceneLifecycleProvider'],
    components: ['WindowGroup', 'Button', 'Text', 'VStack'],
    modifiers: ['frame', 'background', 'foregroundStyle'],
    fewShot: [
      'window chrome shell -> WindowGroup',
      'open utility window -> mock lifecycle update',
    ],
    prompt:
      '把 WindowGroup demo 提炼成 SwiftUI window shell reference，保留 key window 与 open/close stub 行为。',
    jsxSource: [
      '<WindowGroup id="preview.window" title="Preview Window">...</WindowGroup>',
      '<Button title="Open Utility" />',
    ].join('\n'),
  },
  'component-commands': {
    page: getTranslatorPageMeta('component-commands')!,
    constraints: baseConstraints,
    mappings: baseMappings,
    stateModels: ['MockCommandGroup[]', 'MockWindowInfo[]'],
    apiFacades: ['SceneLifecycleProvider', 'AppSystemApi'],
    components: ['Commands', 'Button', 'Text', 'VStack'],
    modifiers: ['padding', 'frame', 'foregroundStyle'],
    fewShot: [
      'file menu -> command group',
      'command action -> open url / window lifecycle update',
    ],
    prompt:
      '把 Commands demo 提炼成 SwiftUI command menu reference，保留 command group 注册与动作 stub。',
    jsxSource: [
      '<Commands id="file-menu" title="File">',
      '  <Button title="New Window" />',
      '</Commands>',
    ].join('\n'),
  },
  'component-scene': {
    page: getTranslatorPageMeta('component-scene')!,
    constraints: baseConstraints,
    mappings: baseMappings,
    stateModels: ['MockSceneInfo[]', 'MockSceneLifecycle'],
    apiFacades: ['SceneLifecycleProvider'],
    components: ['Scene', 'Text', 'VStack'],
    modifiers: ['padding', 'foregroundStyle'],
    fewShot: [
      'settings scene -> Scene(role: .settings)',
      'phase display -> lifecycle stub',
    ],
    prompt:
      '把 Scene demo 提炼成 SwiftUI scene reference，保留 role/phase/lifecycle stub。',
    jsxSource: [
      '<Scene id="settings.scene" role="settings" title="Settings Scene">',
      '  <Text>Scene acts as lifecycle/root grouping shell.</Text>',
      '</Scene>',
    ].join('\n'),
  },
}

export const buildTranslatorExportPacket = (pageId: string): TranslatorExportPacket => {
  return packets[pageId] ?? packets.translator
}
