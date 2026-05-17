import type { TranslatorExportPacket } from './types'

export const buildSwiftUiDraft = (packet: TranslatorExportPacket): string => {
  const components = packet.components.join(', ')
  const modifiers = packet.modifiers.join(', ')

  return [
    `// ${packet.page.title}`,
    'import SwiftUI',
    '',
    `struct ${packet.page.title.replace(/\s+/g, '')}DraftView: View {`,
    '    @State private var selectedRow: String? = nil',
    '    @State private var isSheetPresented = false',
    '',
    '    var body: some View {',
    '        VStack(spacing: 18) {',
    '            Text("Translator Packet Draft")',
    '                .font(.headline)',
    '            Text("Components: ' + components + '")',
    '                .font(.caption)',
    '            Text("Modifiers: ' + modifiers + '")',
    '                .font(.caption)',
    '                .foregroundStyle(.secondary)',
    '            List {',
    '                NavigationLink(value: "detail") {',
    '                    Text("Generated from packet")',
    '                }',
    '            }',
    '        }',
    '        .padding(16)',
    '    }',
    '}',
  ].join('\n')
}
