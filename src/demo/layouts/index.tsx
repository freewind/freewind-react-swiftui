import type { FC } from 'react'
import { FormSection, HStack, Text, VStack } from '../../swift'

const LayoutStub: FC<{ title: string; summary: string }> = ({ title, summary }) => {
  return (
    <FormSection title={title}>
      <VStack spacing={12} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
        <Text>{summary}</Text>
        <HStack
          spacing={12}
          frame={{ maxWidth: 'infinity', minHeight: 240 }}
          background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 18 } }}
          padding={16}
        >
          <Text font="caption" foregroundStyle="secondary">
            layout stub
          </Text>
        </HStack>
      </VStack>
    </FormSection>
  )
}

export const SplitViewDemo: FC = () => {
  return <LayoutStub title="分栏布局" summary="用于对齐 macOS sidebar/content/details 三栏语义。" />
}

export const DashboardDemo: FC = () => {
  return <LayoutStub title="看板布局" summary="用于对齐指标卡片、列表、趋势区的组合布局。" />
}

export const FormSheetDemo: FC = () => {
  return <LayoutStub title="表单弹层" summary="用于对齐 sheet/form/action 区组合语义。" />
}
