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
  fewShot: string[]
  prompt: string
  jsxSource: string
}
