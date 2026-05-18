import type { FC, ReactNode } from 'react'
import { FormSection, HStack, Spacer, Text, VStack } from '../../swift'

const Zone: FC<{
  title: string
  tone: 'blue' | 'green' | 'red'
  meta?: string
  width?: number
  minHeight?: number
  children?: ReactNode
}> = ({ title, tone, meta, width, minHeight = 72, children }) => {
  return (
    <VStack
      spacing={8}
      padding={12}
      frame={{ width, minHeight, maxWidth: width ? undefined : 'infinity', alignment: 'leading' }}
      background={{ fill: tone, in: { kind: 'roundedRectangle', cornerRadius: 16 } }}
    >
      <Text font="caption.semibold" foregroundColor="#ffffff">
        {title}
      </Text>
      {meta ? (
        <Text font="caption2" foregroundColor="rgba(255,255,255,0.82)">
          {meta}
        </Text>
      ) : null}
      {children}
    </VStack>
  )
}

const SplitViewPreview: FC = () => {
  return (
    <HStack
      spacing={12}
      frame={{ maxWidth: 'infinity', minHeight: 280, alignment: 'leading' }}
      background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 18 } }}
      padding={16}
    >
      <Zone title="Sidebar" tone="blue" width={180} meta="fixed 180">
        <Text foregroundColor="#ffffff">Filters</Text>
        <Text foregroundColor="#ffffff">Chats</Text>
        <Text foregroundColor="#ffffff">Files</Text>
      </Zone>
      <Zone title="Content" tone="green" meta="flex fill">
        <HStack spacing={8} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
          <Text foregroundColor="#ffffff">Toolbar</Text>
          <Spacer />
          <Text foregroundColor="#ffffff">Actions</Text>
        </HStack>
        <VStack spacing={8} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
          <Text foregroundColor="#ffffff">List / Thread / Main canvas</Text>
          <Text foregroundColor="rgba(255,255,255,0.82)">content grows with remaining width</Text>
        </VStack>
      </Zone>
      <Zone title="Inspector" tone="red" width={220} meta="fixed 220">
        <Text foregroundColor="#ffffff">Meta</Text>
        <Text foregroundColor="#ffffff">Selection</Text>
        <Text foregroundColor="#ffffff">Status</Text>
      </Zone>
    </HStack>
  )
}

const DashboardPreview: FC = () => {
  return (
    <VStack
      spacing={12}
      frame={{ maxWidth: 'infinity', minHeight: 320, alignment: 'leading' }}
      background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 18 } }}
      padding={16}
    >
      <HStack spacing={12} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
        <Zone title="Metric A" tone="blue" meta="fixed 1/3" />
        <Zone title="Metric B" tone="green" meta="fixed 1/3" />
        <Zone title="Metric C" tone="red" meta="fixed 1/3" />
      </HStack>
      <HStack spacing={12} frame={{ maxWidth: 'infinity', maxHeight: 'infinity', alignment: 'leading' }}>
        <Zone title="Trend / Chart" tone="green" minHeight={180} meta="main area">
          <Text foregroundColor="#ffffff">wide panel</Text>
        </Zone>
        <VStack spacing={12} frame={{ width: 220, alignment: 'leading' }}>
          <Zone title="Activity" tone="blue" meta="side list" />
          <Zone title="Alerts" tone="red" meta="side list" />
        </VStack>
      </HStack>
    </VStack>
  )
}

const FormSheetPreview: FC = () => {
  return (
    <HStack
      spacing={0}
      frame={{ maxWidth: 'infinity', minHeight: 320, alignment: 'center' }}
      background={{ fill: 'ultraThinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 18 } }}
      padding={20}
    >
      <VStack
        spacing={12}
        padding={16}
        frame={{ width: 560, maxWidth: 'infinity', alignment: 'leading' }}
        background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 20 } }}
      >
        <Zone title="Header" tone="blue" meta="title + subtitle" minHeight={60} />
        <Zone title="Form Body" tone="green" meta="fields / validation" minHeight={120}>
          <HStack spacing={8} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
            <Text foregroundColor="#ffffff">Label</Text>
            <Spacer />
            <Text foregroundColor="#ffffff">Input</Text>
          </HStack>
        </Zone>
        <Zone title="Action Bar" tone="red" meta="cancel / save" minHeight={64}>
          <HStack spacing={8} frame={{ maxWidth: 'infinity', alignment: 'trailing' }}>
            <Spacer />
            <Text foregroundColor="#ffffff">Cancel</Text>
            <Text foregroundColor="#ffffff">Save</Text>
          </HStack>
        </Zone>
      </VStack>
    </HStack>
  )
}

const LayoutSection: FC<{ title: string; summary: string; preview: JSX.Element }> = ({ title, summary, preview }) => {
  return (
    <FormSection title={title}>
      <VStack spacing={12} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
        <Text foregroundStyle="secondary">{summary}</Text>
        {preview}
      </VStack>
    </FormSection>
  )
}

export const SplitViewDemo: FC = () => {
  return (
    <LayoutSection
      title="分栏布局"
      summary="蓝=sidebar，绿=main content，红=inspector。直接看固定宽与剩余宽如何分摊。"
      preview={<SplitViewPreview />}
    />
  )
}

export const DashboardDemo: FC = () => {
  return (
    <LayoutSection
      title="看板布局"
      summary="上排指标卡；下排主趋势区 + 右侧辅栏。重点看横向/纵向剩余空间如何吃满。"
      preview={<DashboardPreview />}
    />
  )
}

export const FormSheetDemo: FC = () => {
  return (
    <LayoutSection
      title="表单弹层"
      summary="外层是 sheet 画布，中间是内容卡。蓝=header，绿=form，红=actions。"
      preview={<FormSheetPreview />}
    />
  )
}
