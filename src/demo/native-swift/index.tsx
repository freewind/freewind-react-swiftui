import type { FC } from 'react'
import { FormSection, GroupBox, HStack, ScrollView, Text, VStack } from '../../swift'
import { buildSwiftUiDraft, buildTranslatorExportPacket } from '../../translator'
import { QQDemo } from '../qq'

import rootViewSwiftSource from '/Users/peng.li/workspace/freewind-qq/native/macos/Sources/FreewindQQMac/Features/RootView.swift?raw'
import chatScreenSwiftSource from '/Users/peng.li/workspace/freewind-qq/native/macos/Sources/FreewindQQMac/Features/ChatScreen.swift?raw'
import composerTextViewSwiftSource from '/Users/peng.li/workspace/freewind-qq/native/macos/Sources/FreewindQQMac/ComposerTextView.swift?raw'

const sourceCards = [
  {
    title: 'RootView.swift',
    pageId: 'native-swift-root-view',
    swiftSource: rootViewSwiftSource,
  },
  {
    title: 'ChatScreen.swift',
    pageId: 'native-swift-chat-screen',
    swiftSource: chatScreenSwiftSource,
  },
  {
    title: 'ComposerTextView.swift',
    pageId: 'native-swift-composer-text-view',
    swiftSource: composerTextViewSwiftSource,
  },
] as const

export const NativeSwiftSourceDemo: FC = () => {
  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="真实 Swift 代码">
        <VStack spacing={10} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
          <Text>真实 Swift 源、mock 预览、packet、draft 同页对照。</Text>
          <Text font="caption" foregroundStyle="secondary">
            目标：直接给 AE/AI 一份更稳定的 SwiftUI 转换工作台。
          </Text>
        </VStack>
      </FormSection>
      <GroupBox title="Mock Preview" frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
        <QQDemo />
      </GroupBox>
      {sourceCards.map(item => {
        const packet = buildTranslatorExportPacket(item.pageId)
        const draft = buildSwiftUiDraft(packet)

        return (
          <GroupBox key={item.title} title={item.title} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
            <HStack spacing={12} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
              <Pane title="Swift Source" content={item.swiftSource} />
              <Pane title="Export Packet" content={JSON.stringify(packet, null, 2)} />
              <Pane title="SwiftUI Draft" content={draft} />
            </HStack>
          </GroupBox>
        )
      })}
    </VStack>
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
