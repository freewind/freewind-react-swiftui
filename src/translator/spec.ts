export type TranslatorPage = {
  id: string
  title: string
  intent: string
}

export const swiftUiDslRules = [
  '只用仓库 DSL 组件，禁原生 DOM/CSS。',
  '状态经 Binding / mock facade 暴露。',
  '布局优先 VStack/HStack/ZStack/ScrollView。',
  '副作用留在 mock-system / translator 外层。',
] as const

export const swiftUiMappings = [
  ['<VStack spacing={12}>', 'VStack(spacing: 12)'],
  ['frame={{ maxWidth: "infinity" }}', '.frame(maxWidth: .infinity)'],
  ['background={{ fill: "thinMaterial" }}', '.background(.thinMaterial)'],
  ['useBinding("text")', '@State var text = "text"'],
] as const

export const translatorPromptTemplate = [
  '目标：把受限 JSX DSL 稳定翻成 SwiftUI。',
  '先保结构，再补 modifiers，再接 state。',
  '优先复用 mock facade 命名，不凭空造 API。',
  '遇到 DSL 缺口，先指出缺口，再给最小 SwiftUI 草稿。',
  '输出以可读 SwiftUI 为主，不展开无关解释。',
  '不要把外层 string/json 转换塞进核心 view。',
].join('\n')

export const translatorExportPages: TranslatorPage[] = [
  { id: 'qq', title: 'QQ 聊天', intent: '双栏聊天 + mock 附件动作' },
  { id: 'system-api', title: '系统 API Mock', intent: '文件树 / 系统 facade 演示' },
  { id: 'todo', title: 'Todo', intent: '简单列表状态流' },
]
