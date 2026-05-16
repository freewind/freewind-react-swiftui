export const swiftUiDslRules = [
  '只允许使用项目 DSL 组件，不允许原生 DOM 标签，不允许外部 React UI 组件。',
  '不允许 style/className/CSS modules/tailwind/styled-components/emotion。',
  'props 命名尽量贴 SwiftUI 语义：padding/frame/background/foregroundStyle/buttonStyle/pickerStyle。',
  '状态优先用 useBinding/useMockAppShell/useMockEnvironment，避免任意自定义状态协议。',
  '系统能力优先经 mock AppShell/AppSystemApi/AppFileApi，不直接读浏览器 API。',
  '布局优先 VStack/HStack/ZStack/ScrollView/Spacer/Divider，不引入浏览器私有 layout 术语。',
  '颜色优先 token/material，不在业务层写随意十六进制色值；示意图块可例外。',
  '可转换目标优先：让 AI 能稳定恢复 SwiftUI 结构，不追 React 生态表达力最大化。',
]

export const swiftUiMappings = [
  ['WindowGroup(theme)', 'WindowGroup { ... } + colorScheme / appearance hint'],
  ['VStack/HStack/ZStack', 'VStack/HStack/ZStack'],
  ['LazyVStack/LazyHStack', 'LazyVStack/LazyHStack'],
  ['Text', 'Text'],
  ['Image(systemName)', 'Image(systemName:)'],
  ['Button(title/onPress)', 'Button(action:) { Text(...) }'],
  ['Button(buttonStyle="link")', '.buttonStyle(.link) or custom link-like button'],
  ['TextField(text)', 'TextField(_, text:)'],
  ['TextEditor(text)', 'TextEditor(text:)'],
  ['Picker(selection/options)', 'Picker(selection:) { Text(...).tag(...) }'],
  ['Sheet(isPresented)', '.sheet(isPresented:)'],
  ['ContextMenu(items)', '.contextMenu { ... }'],
  ['GeometryReader', 'GeometryReader { proxy in ... }'],
  ['ScrollViewReader', 'ScrollViewReader { proxy in ... }'],
  ['DropArea/onDrop', '.onDrop(...)'],
  ['WindowAccessor', 'NSViewRepresentable bridge / window resolver'],
  ['padding/frame/background/foregroundStyle', '同名 modifier'],
  ['useBinding', '@State / @Binding'],
  ['useMockAppShell', '@ObservedObject / @StateObject shell facade'],
  ['AppSystemApi.makeDownloadRoot', 'FileManager.default.urls(for: .downloadsDirectory, in: .userDomainMask).first!'],
  ['AppSystemApi.pickFiles', 'NSOpenPanel'],
  ['AppSystemApi.clipboardImage', 'NSImage(pasteboard: .general)'],
  ['AppFileApi.openAttachment/revealPath', 'NSWorkspace.shared.open / activateFileViewerSelecting'],
]

export const translatorPromptTemplate = `你要把一段受限 SwiftUI-shaped JSX 翻译成 SwiftUI。

要求：
1. 保持原始 UI 结构、层级、状态语义、命名意图。
2. 优先输出可编译 SwiftUI，不要输出解释。
3. JSX 里的 VStack/HStack/ZStack/Text/Image/Button/TextField/TextEditor/Picker/Sheet 与 SwiftUI 同名 view 对齐。
4. JSX 的 padding/frame/background/foregroundStyle/buttonStyle/pickerStyle 尽量翻译成同名 modifier。
5. useBinding 优先翻译为 @State 或 @Binding。
6. useMockAppShell / useMockEnvironment 暂视为 ObservableObject facade；若缺类型，补最小可编译 stub。
7. AppSystemApi/AppFileApi/AppShell 的方法名尽量保留并映射到 macOS 实现。
8. 遇到浏览器示意色块或 demo-only 数据，保留语义，不要引入 Web-only API。

输出格式：
- 先输出 SwiftUI 代码
- 若必须补 stub，就紧接着输出最小 stub
- 不要写额外解释
`

export const translatorFewShot = [
  {
    title: 'Binding to State',
    jsx: `const name = useBinding('freewind')
<VStack spacing={12}>
  <TextField text={name} placeholder="device name" textFieldStyle="roundedBorder" />
  <Text>{name.value}</Text>
</VStack>`,
    swift: `@State private var name = "freewind"

VStack(spacing: 12) {
    TextField("device name", text: $name)
        .textFieldStyle(.roundedBorder)
    Text(name)
}`,
  },
  {
    title: 'Sheet and Actions',
    jsx: `const open = useBinding(false)
<>
  <Button title="Open" buttonStyle="borderedProminent" onPress={() => open.setValue(true)} />
  <Sheet isPresented={open}>
    <VStack spacing={12} padding={20}>
      <Text font="headline">Hello</Text>
    </VStack>
  </Sheet>
</>`,
    swift: `@State private var open = false

Button("Open") {
    open = true
}
.buttonStyle(.borderedProminent)
.sheet(isPresented: $open) {
    VStack(spacing: 12) {
        Text("Hello")
            .font(.headline)
    }
    .padding(20)
}`,
  },
]
