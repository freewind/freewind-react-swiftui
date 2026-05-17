import type { FC } from 'react'
import { FormSection, GroupBox, HStack, Picker, SceneLifecycleProvider, ScrollView, Text, VStack, useBinding, useSceneLifecycle } from '../../swift'
import { buildSwiftUiDraft, buildTranslatorExportPacket, translatorPageRegistry } from '../../translator'
import { QQDemo } from '../qq'

const sourceCards = translatorPageRegistry.filter(item => item.category === 'native-swift' && item.swiftSource)

export const NativeSwiftSourceDemo: FC = () => {
  const selection = useBinding(sourceCards[0]?.id ?? 'native-swift-root-view')
  const selectedCard = sourceCards.find(item => item.id === selection.value) ?? sourceCards[0]
  const packet = buildTranslatorExportPacket(selectedCard.id)
  const draft = buildSwiftUiDraft(packet)

  return (
    <SceneLifecycleProvider>
      <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
        <FormSection title="真实 Swift 代码">
          <VStack spacing={10} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
            <Text>真实 Swift 源、mock 预览、packet、draft 同页对照。</Text>
            <Text font="caption" foregroundStyle="secondary">
              目标：直接给 AE/AI 一份更稳定的 SwiftUI 转换工作台。
            </Text>
            <Picker
              selection={selection}
              pickerStyle="segmented"
              options={sourceCards.map(item => ({
                label: item.title.replace('.swift', ''),
                value: item.id,
              }))}
            />
          </VStack>
        </FormSection>
        <LifecyclePanel />
        <GroupBox title="Mock Preview" frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
          <QQDemo />
        </GroupBox>
        <GroupBox title={selectedCard.title} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
          <HStack spacing={12} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
            <Pane title="Swift Source" content={selectedCard.swiftSource ?? ''} />
            <Pane title="Export Packet" content={JSON.stringify(packet, null, 2)} />
            <Pane title="SwiftUI Draft" content={draft} />
          </HStack>
        </GroupBox>
      </VStack>
    </SceneLifecycleProvider>
  )
}

const LifecyclePanel: FC = () => {
  const lifecycle = useSceneLifecycle()

  return (
    <GroupBox title="Scene Lifecycle Stub" frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <VStack spacing={6} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
        <Text font="caption" foregroundStyle="secondary">
          phase: {lifecycle.value.phase}
        </Text>
        <Text font="caption2.monospaced" foregroundStyle="tertiary" textSelection="enabled">
          windows: {JSON.stringify(lifecycle.value.windows)}
        </Text>
        <Text font="caption2.monospaced" foregroundStyle="tertiary" textSelection="enabled">
          commands: {JSON.stringify(lifecycle.value.commands)}
        </Text>
        <Text font="caption2.monospaced" foregroundStyle="tertiary" textSelection="enabled">
          scenes: {JSON.stringify(lifecycle.value.scenes)}
        </Text>
      </VStack>
    </GroupBox>
  )
}

const Pane: FC<{
  title: string
  content: string
}> = ({ title, content }) => {
  return (
    <VStack spacing={8} frame={{ maxWidth: 'infinity', minHeight: 320, alignment: 'leading' }}>
      <Text font="caption.semibold">{title}</Text>
      <ScrollView
        axes={['horizontal', 'vertical']}
        padding={12}
        frame={{ maxWidth: 'infinity', height: 320, alignment: 'leading' }}
        background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 14 } }}
      >
        <Text monospaced textSelection="enabled" font="caption2.monospaced">
          {content}
        </Text>
      </ScrollView>
    </VStack>
  )
}
