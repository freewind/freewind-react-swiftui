import type { FC } from 'react'
import {
  Button,
  DropArea,
  FormSection,
  GeometryReader,
  HStack,
  Picker,
  ScrollView,
  ScrollViewReader,
  Spacer,
  Text,
  TextEditor,
  WindowAccessor,
  buildSwiftUiDraft,
  buildTranslatorExportPacket,
  translatorExportPages,
  translatorFewShot,
  translatorPromptTemplate,
  useBinding,
  VStack,
  swiftUiDslRules,
  swiftUiMappings,
} from '../swiftui'
import { CodePanel } from './shared'
import { QQDemo, SystemApiMockDemo } from './appPages'
import chatScreenSwiftSource from '../../../freewind-qq/native/macos/Sources/FreewindQQMac/Features/ChatScreen.swift?raw'
import composerTextViewSwiftSource from '../../../freewind-qq/native/macos/Sources/FreewindQQMac/ComposerTextView.swift?raw'
import rootViewSwiftSource from '../../../freewind-qq/native/macos/Sources/FreewindQQMac/Features/RootView.swift?raw'

export const TranslatorSpecDemo: FC = () => {
  const selectedPacket = useBinding('qq')
  const packet = buildTranslatorExportPacket(selectedPacket.value)
  const packetPreview = packet ? JSON.stringify(packet, null, 2) : ''
  const swiftDraft = buildSwiftUiDraft(packet)

  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="DSL 约束">
        <VStack spacing={8} alignment="leading" frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
          {swiftUiDslRules.map(rule => (
            <Text key={rule}>{rule}</Text>
          ))}
        </VStack>
      </FormSection>

      <FormSection title="JSX -> SwiftUI 映射">
        <VStack spacing={8} alignment="leading" frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
          {swiftUiMappings.map(([jsxSide, swiftSide]) => (
            <HStack
              key={jsxSide}
              spacing={10}
              padding={12}
              frame={{ maxWidth: 'infinity', alignment: 'leading' }}
              background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 14 } }}
            >
              <Text font="caption2.monospaced" frame={{ width: 320, alignment: 'leading' }}>
                {jsxSide}
              </Text>
              <Text foregroundStyle="secondary">{swiftSide}</Text>
            </HStack>
          ))}
        </VStack>
      </FormSection>

      <FormSection title="Prompt 模板">
        <TextEditor text={useBinding(translatorPromptTemplate)} frame={{ height: 320, maxWidth: 'infinity' }} />
      </FormSection>

      <FormSection title="Translator Export Packet">
        <VStack spacing={12} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
          <Picker
            selection={selectedPacket}
            pickerStyle="segmented"
            options={translatorExportPages.map(page => ({
              label: page.title,
              value: page.id,
            }))}
          />
          <Text foregroundStyle="secondary">
            这不是整段源码直喂 AI，而是先导出结构化 context 包。
          </Text>
          <ScrollView frame={{ height: 360, maxWidth: 'infinity' }}>
            <CodePanel>{packetPreview}</CodePanel>
          </ScrollView>
        </VStack>
      </FormSection>

      <FormSection title="SwiftUI Draft">
        <VStack spacing={12} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
          <Text foregroundStyle="secondary">
            这里先给一版 repo 内置 draft，后续再让 AI 在这个基础上细修。
          </Text>
          <ScrollView frame={{ height: 420, maxWidth: 'infinity' }}>
            <CodePanel>{swiftDraft}</CodePanel>
          </ScrollView>
        </VStack>
      </FormSection>

      <FormSection title="Few-shot">
        <VStack spacing={12} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
          {translatorFewShot.map(example => (
            <VStack
              key={example.title}
              spacing={10}
              padding={14}
              frame={{ maxWidth: 'infinity', alignment: 'leading' }}
              background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 16 } }}
            >
              <Text font="headline">{example.title}</Text>
              <Text font="caption.semibold" foregroundStyle="secondary">
                JSX
              </Text>
              <Text font="caption2.monospaced" textSelection="enabled">
                {example.jsx}
              </Text>
              <Text font="caption.semibold" foregroundStyle="secondary">
                SwiftUI
              </Text>
              <Text font="caption2.monospaced" textSelection="enabled">
                {example.swift}
              </Text>
            </VStack>
          ))}
        </VStack>
      </FormSection>
    </VStack>
  )
}

export const NativeSwiftSourceDemo: FC = () => {
  const selectedSource = useBinding<'root' | 'chat' | 'composer'>('root')
  const selectedPacket = useBinding<'qq' | 'system-api'>('qq')
  const packet = buildTranslatorExportPacket(selectedPacket.value)
  const swiftDraft = buildSwiftUiDraft(packet)

  const sourceMap = {
    root: {
      title: 'RootView.swift',
      source: rootViewSwiftSource,
    },
    chat: {
      title: 'ChatScreen.swift',
      source: chatScreenSwiftSource,
    },
    composer: {
      title: 'ComposerTextView.swift',
      source: composerTextViewSwiftSource,
    },
  } as const

  const currentSource = sourceMap[selectedSource.value]

  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="真实 Swift 源文件">
        <VStack spacing={12} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
          <Picker
            selection={selectedSource}
            pickerStyle="segmented"
            options={[
              { label: 'RootView', value: 'root' },
              { label: 'ChatScreen', value: 'chat' },
              { label: 'ComposerTextView', value: 'composer' },
            ]}
          />
          <Text foregroundStyle="secondary">
            这里直接显示 `/Users/peng.li/workspace/freewind-qq/native/macos` 里的真实 Swift 源码。
          </Text>
          <Text font="headline">{currentSource.title}</Text>
          <ScrollView frame={{ height: 420, maxWidth: 'infinity' }}>
            <CodePanel>{currentSource.source}</CodePanel>
          </ScrollView>
        </VStack>
      </FormSection>

      <FormSection title="已补的 native/mock 对应">
        <VStack spacing={12} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
          <Text foregroundStyle="secondary">
            为了对齐 `freewind-qq/native/macos` 真实用面，这里已补一批对应 mock/runtime 能力。
          </Text>
          <GeometryReader
            padding={12}
            background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 14 } }}
            frame={{ maxWidth: 'infinity' }}
          >
            {proxy => (
              <VStack spacing={8} alignment="leading" frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
                <Text font="headline">GeometryReader</Text>
                <Text font="caption2.monospaced">
                  width: {String(proxy.size.width)} height: {String(proxy.size.height)}
                </Text>
              </VStack>
            )}
          </GeometryReader>

          <ScrollViewReader
            padding={12}
            background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 14 } }}
            frame={{ maxWidth: 'infinity' }}
          >
            {proxy => (
              <HStack>
                <Text>ScrollViewReader mock</Text>
                <Spacer />
                <Button title="scrollTo(bottom)" buttonStyle="bordered" onPress={() => proxy.scrollTo('bottom', { anchor: 'bottom' })} />
              </HStack>
            )}
          </ScrollViewReader>

          <DropArea
            padding={12}
            background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 14 } }}
            frame={{ maxWidth: 'infinity' }}
            onDrop={() => {}}
          >
            <Text>DropArea mock，对应 SwiftUI `onDrop` 语义。</Text>
          </DropArea>

          <VStack
            spacing={8}
            padding={12}
            background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 14 } }}
            frame={{ maxWidth: 'infinity', alignment: 'leading' }}
          >
            <Text font="headline">WindowAccessor</Text>
            <Text foregroundStyle="secondary">对应 `NSViewRepresentable` bridge 的最小 mock。</Text>
            <WindowAccessor onResolve={window => void window.title} />
          </VStack>
        </VStack>
      </FormSection>

      <FormSection title="对应 Demo / 预览">
        <VStack spacing={12} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
          <Picker
            selection={selectedPacket}
            pickerStyle="segmented"
            options={[
              { label: 'QQ', value: 'qq' },
              { label: 'System API', value: 'system-api' },
            ]}
          />
          <Text foregroundStyle="secondary">
            用真实 Swift 源码做输入参考；下面是当前 repo 的 mock 预览与导出的 SwiftUI 草稿。
          </Text>
          {selectedPacket.value === 'qq' ? <QQDemo /> : <SystemApiMockDemo />}
        </VStack>
      </FormSection>

      <FormSection title="Export Packet">
        <ScrollView frame={{ height: 260, maxWidth: 'infinity' }}>
          <CodePanel>{packet ? JSON.stringify(packet, null, 2) : ''}</CodePanel>
        </ScrollView>
      </FormSection>

      <FormSection title="SwiftUI Draft">
        <ScrollView frame={{ height: 420, maxWidth: 'infinity' }}>
          <CodePanel>{swiftDraft}</CodePanel>
        </ScrollView>
      </FormSection>
    </VStack>
  )
}
