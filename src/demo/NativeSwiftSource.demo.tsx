import type { FC } from 'react'
import {
  Button,
  DropArea,
  FormSection,
  GeometryReader,
  HStack,
  Picker,
  ScrollViewReader,
  Spacer,
  Text,
  WindowAccessor,
  buildSwiftUiDraft,
  buildTranslatorExportPacket,
  useBinding,
  VStack,
} from '../swift'
import { QQDemo } from './QQ.demo'
import { SystemApiMockDemo } from './SystemApiMock.demo'

export const NativeSwiftSourceDemo: FC = () => {
  const selectedPacket = useBinding<'qq' | 'system-api'>('qq')
  const packet = buildTranslatorExportPacket(selectedPacket.value)
  const swiftDraft = buildSwiftUiDraft(packet)
  const draftLineCount = swiftDraft.split('\n').length

  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="原生来源对照">
        <VStack spacing={12} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
          <Text foregroundStyle="secondary">demo 已按 `/Users/peng.li/workspace/freewind-qq/native/macos` 的真实页面结构补对应预览，但不再内嵌源码面板。</Text>
          <VStack spacing={8} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
            <Text>RootView.swift → 分栏壳 + tab 切换</Text>
            <Text>ChatScreen.swift → 联系人/消息/输入区</Text>
            <Text>ComposerTextView.swift → 多行输入、发送、附件动作</Text>
          </VStack>
        </VStack>
      </FormSection>

      <FormSection title="已补的 native/mock 对应">
        <VStack spacing={12} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
          <Text foregroundStyle="secondary">为了对齐 `freewind-qq/native/macos` 真实用面，这里已补一批对应 mock/runtime 能力。</Text>
          <GeometryReader
            padding={12}
            background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 14 } }}
            frame={{ maxWidth: 'infinity' }}
          >
            {proxy => (
              <VStack spacing={8} alignment="leading" frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
                <Text font="headline">GeometryReader</Text>
                <Text font="caption2.monospaced">width: {String(proxy.size.width)} height: {String(proxy.size.height)}</Text>
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
          <Text foregroundStyle="secondary">用真实 Swift 结构做输入参考；下面是当前 repo 的 mock 预览。</Text>
          {selectedPacket.value === 'qq' ? <QQDemo /> : <SystemApiMockDemo />}
        </VStack>
      </FormSection>

      <FormSection title="转换摘要">
        <VStack spacing={10} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
          <Picker
            selection={selectedPacket}
            pickerStyle="segmented"
            options={[
              { label: 'QQ', value: 'qq' },
              { label: 'System API', value: 'system-api' },
            ]}
          />
          {packet ? (
            <VStack spacing={8} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
              <Text>page: {packet.page.title}</Text>
              <Text>components: {String(packet.components.length)}</Text>
              <Text>apiFacades: {String(packet.apiFacades.length)}</Text>
              <Text>draft lines: {String(draftLineCount)}</Text>
            </VStack>
          ) : null}
        </VStack>
      </FormSection>
    </VStack>
  )
}
