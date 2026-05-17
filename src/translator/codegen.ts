import type { TranslatorExportPacket } from './exporter'

export const buildSwiftUiDraft = (packet: TranslatorExportPacket): string => {
  const componentList = packet.components.join(', ')
  const modifierList = packet.modifiers.join(', ')

  return [
    `// ${packet.page.title}`,
    `// intent: ${packet.page.intent}`,
    'struct DemoDraftView: View {',
    '  var body: some View {',
    '    VStack(alignment: .leading, spacing: 12) {',
    `      Text("${packet.page.title}")`,
    `      Text("${packet.page.intent}")`,
    `      Text("components: ${componentList}")`,
    `      Text("modifiers: ${modifierList}")`,
    '    }',
    '    .frame(maxWidth: .infinity, alignment: .leading)',
    '    .padding(16)',
    '  }',
    '}',
  ].join('\n')
}
