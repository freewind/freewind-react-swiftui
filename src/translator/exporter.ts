import { swiftUiDslRules, swiftUiMappings, translatorFewShot, translatorPromptTemplate } from './spec'

export type TranslatorExportPage = {
  id: string
  title: string
  intent: string
  components: string[]
  modifiers: string[]
  stateModels: string[]
  apiFacades: string[]
  jsxSource: string
}

export type TranslatorExportPacket = {
  page: {
    id: string
    title: string
    intent: string
  }
  constraints: string[]
  mappings: Array<{
    jsx: string
    swiftui: string
  }>
  stateModels: string[]
  apiFacades: string[]
  components: string[]
  modifiers: string[]
  fewShot: typeof translatorFewShot
  prompt: string
  jsxSource: string
}

export const translatorExportPages: TranslatorExportPage[] = [
  {
    id: 'qq',
    title: 'QQ 聊天',
    intent: '联系人侧栏 + 聊天详情 + 输入区 + 附件/扫描日志交互',
    components: ['WindowGroup', 'VStack', 'HStack', 'ScrollView', 'Text', 'Button', 'Image', 'Picker', 'TextEditor', 'Sheet', 'Spacer', 'Divider'],
    modifiers: ['padding', 'frame', 'background', 'foregroundStyle', 'buttonStyle', 'pickerStyle'],
    stateModels: ['useBinding', 'useMockAppShell'],
    apiFacades: ['AppShell', 'AppSystemApi', 'AppFileApi'],
    jsxSource: `const shell = useMockAppShell()
const draft = useBinding('...')
<HStack spacing={0}>
  <ContactsPaneMini />
  <Divider axis="vertical" />
  {shell.openedDigest ? <ChatPanel draft={draft} /> : <EmptyChatPanel />}
</HStack>`,
  },
  {
    id: 'system-api',
    title: '系统 API Mock',
    intent: '以受限 facade 模拟文件系统、剪贴板、下载目录、pickFiles、open/reveal/save',
    components: ['VStack', 'HStack', 'Text', 'Button', 'TextField', 'Picker', 'FormSection'],
    modifiers: ['padding', 'frame', 'background', 'foregroundStyle', 'buttonStyle'],
    stateModels: ['useBinding', 'useMockEnvironment'],
    apiFacades: ['AppSystemApi', 'AppFileApi'],
    jsxSource: `const env = useMockEnvironment()
const [systemApi, fileApi] = [env.systemApi, env.fileApi]
<VStack spacing={18}>
  <FormSection title="AppSystemApi">...</FormSection>
  <FormSection title="Mock File System">...</FormSection>
  <FormSection title="AppFileApi">...</FormSection>
</VStack>`,
  },
  {
    id: 'todo',
    title: 'Todo List',
    intent: '分段筛选 + 输入新增 + 列表项状态展示',
    components: ['VStack', 'HStack', 'Text', 'TextField', 'Button', 'Picker', 'Image'],
    modifiers: ['padding', 'frame', 'background', 'foregroundStyle', 'buttonStyle', 'pickerStyle'],
    stateModels: ['useBinding'],
    apiFacades: [],
    jsxSource: `const segment = useBinding('all')
const input = useBinding('...')
<VStack spacing={14}>
  <Picker selection={segment} pickerStyle="segmented" options={[...]} />
  <HStack>
    <TextField text={input} ... />
    <Button title="添加" ... />
  </HStack>
</VStack>`,
  },
]

export const buildTranslatorExportPacket = (pageId: string): TranslatorExportPacket | null => {
  const page = translatorExportPages.find(item => item.id === pageId)
  if (!page) {
    return null
  }

  return {
    page: {
      id: page.id,
      title: page.title,
      intent: page.intent,
    },
    constraints: swiftUiDslRules,
    mappings: swiftUiMappings.map(([jsx, swiftui]) => ({
      jsx,
      swiftui,
    })),
    stateModels: page.stateModels,
    apiFacades: page.apiFacades,
    components: page.components,
    modifiers: page.modifiers,
    fewShot: translatorFewShot,
    prompt: `${translatorPromptTemplate}

当前页面：
- id: ${page.id}
- title: ${page.title}
- intent: ${page.intent}
- components: ${page.components.join(', ')}
- modifiers: ${page.modifiers.join(', ')}
- stateModels: ${page.stateModels.join(', ')}
- apiFacades: ${page.apiFacades.join(', ') || 'none'}
`,
    jsxSource: page.jsxSource,
  }
}
