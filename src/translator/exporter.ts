import { swiftUiDslRules, swiftUiMappings, translatorExportPages, translatorPromptTemplate, type TranslatorPage } from './spec'

export type TranslatorExportPacket = {
  page: TranslatorPage
  constraints: string[]
  mappings: Array<{ jsx: string; swiftui: string }>
  stateModels: string[]
  apiFacades: string[]
  components: string[]
  modifiers: string[]
  fewShot: Array<{ title: string; jsx: string; swiftui: string }>
  prompt: string
  jsxSource: string
}

const packetMap: Record<string, Omit<TranslatorExportPacket, 'page' | 'constraints' | 'mappings' | 'prompt'>> = {
  qq: {
    stateModels: ['Binding<string>', 'Binding<boolean>', 'ChatMessage[]'],
    apiFacades: ['useMockAppShell', 'openPeer', 'sendText', 'chooseFilesAndSend'],
    components: ['HStack', 'VStack', 'ScrollView', 'TextEditor', 'Sheet'],
    modifiers: ['frame', 'padding', 'background', 'foregroundStyle'],
    fewShot: [
      {
        title: 'chat input',
        jsx: '<TextEditor text={draft} />',
        swiftui: 'TextEditor(text: $draft)',
      },
      {
        title: 'peer list',
        jsx: '<ForEach peers />',
        swiftui: 'ForEach(peers, id: \\.deviceId)',
      },
    ],
    jsxSource: '<QQDemo />',
  },
  'system-api': {
    stateModels: ['MockFileNode[]', 'MockOpenEvent[]'],
    apiFacades: ['useMockEnvironment', 'createFile', 'renamePath', 'removePath'],
    components: ['FormSection', 'Picker', 'Button', 'TextField'],
    modifiers: ['frame', 'padding'],
    fewShot: [
      {
        title: 'folder picker',
        jsx: '<Picker selection={kind} />',
        swiftui: 'Picker(selection: $kind) { ... }',
      },
    ],
    jsxSource: '<SystemApiMockDemo />',
  },
  todo: {
    stateModels: ['Binding<string>', 'TodoItem[]'],
    apiFacades: ['local mock state'],
    components: ['List', 'HStack', 'Button'],
    modifiers: ['padding', 'foregroundStyle'],
    fewShot: [
      {
        title: 'todo row',
        jsx: '<HStack><Toggle /><Text /></HStack>',
        swiftui: 'HStack { Toggle(...); Text(...) }',
      },
    ],
    jsxSource: '<TodoDemo />',
  },
}

export const buildTranslatorExportPacket = (pageId: string): TranslatorExportPacket => {
  const page = translatorExportPages.find(item => item.id === pageId) ?? translatorExportPages[0]
  const detail = packetMap[page.id]

  return {
    page,
    constraints: [...swiftUiDslRules],
    mappings: swiftUiMappings.map(([jsx, swiftui]) => ({ jsx, swiftui })),
    prompt: translatorPromptTemplate,
    ...detail,
  }
}
