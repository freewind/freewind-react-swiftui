import type { FC } from 'react'
import {
  FormSection,
  HStack,
  Picker,
  Text,
  buildSwiftUiDraft,
  buildTranslatorExportPacket,
  translatorExportPages,
  translatorPromptTemplate,
  useBinding,
  VStack,
  swiftUiDslRules,
  swiftUiMappings,
} from '../swift'

export const TranslatorSpecDemo: FC = () => {
  const selectedPacket = useBinding('qq')
  const packet = buildTranslatorExportPacket(selectedPacket.value)
  const swiftDraft = buildSwiftUiDraft(packet)
  const promptPrinciples = translatorPromptTemplate
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean)
    .slice(0, 6)
  const draftLineCount = swiftDraft.split('\n').length

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

      <FormSection title="Prompt 关注点">
        <VStack spacing={8} alignment="leading" frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
          {promptPrinciples.map(rule => (
            <Text key={rule}>{rule}</Text>
          ))}
        </VStack>
      </FormSection>

      <FormSection title="Translator Export 摘要">
        <VStack spacing={12} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
          <Picker
            selection={selectedPacket}
            pickerStyle="segmented"
            options={translatorExportPages.map(page => ({ label: page.title, value: page.id }))}
          />
          <Text foregroundStyle="secondary">先导出结构化 context，再让 AI 基于约束与 few-shot 转 SwiftUI。</Text>
          {packet ? (
            <VStack spacing={10} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
              <Text>page: {packet.page.title}</Text>
              <Text>intent: {packet.page.intent}</Text>
              <Text>components: {String(packet.components.length)}</Text>
              <Text>modifiers: {String(packet.modifiers.length)}</Text>
              <Text>stateModels: {String(packet.stateModels.length)}</Text>
              <Text>apiFacades: {String(packet.apiFacades.length)}</Text>
            </VStack>
          ) : null}
        </VStack>
      </FormSection>

      <FormSection title="Draft 统计">
        <VStack spacing={12} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
          <Text foregroundStyle="secondary">repo 内置 draft 仍保留，但 demo 不再内嵌源码面板。</Text>
          <HStack spacing={14} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
            <VStack spacing={6} padding={14} frame={{ width: 200, alignment: 'leading' }} background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 16 } }}>
              <Text font="headline">draft lines</Text>
              <Text>{String(draftLineCount)}</Text>
            </VStack>
            <VStack spacing={6} padding={14} frame={{ width: 200, alignment: 'leading' }} background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 16 } }}>
              <Text font="headline">few-shot</Text>
              <Text>{String(packet?.fewShot.length ?? 0)}</Text>
            </VStack>
          </HStack>
        </VStack>
      </FormSection>

      <FormSection title="Few-shot 覆盖面">
        <VStack spacing={8} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
          <Text>基础文本与按钮</Text>
          <Text>布局栈与滚动容器</Text>
          <Text>sheet / context menu / 文件 mock</Text>
          <Text>聊天 UI 与原生对照案例</Text>
        </VStack>
      </FormSection>
    </VStack>
  )
}
