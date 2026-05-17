import type { FC } from 'react'
import { Button, HStack, Label, Spacer, Text, VStack } from '../swiftui'

export const HeroHeader: FC<{
  activePage: string
}> = ({ activePage }) => {
  return (
    <HStack
      padding={18}
      frame={{ maxWidth: 'infinity' }}
      background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 18 } }}
      spacing={14}
    >
      <VStack spacing={4} alignment="leading" frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
        <Text font="title2">{activePage}</Text>
        <Text foregroundStyle="secondary">
          用一批受限 SwiftUI-shaped JSX 组件，快速看 UI，方便后续 AI 转 SwiftUI。
        </Text>
      </VStack>
      <Button title="Preview Ready" buttonStyle="borderedProminent" />
    </HStack>
  )
}

export const ButtonCard: FC<{
  title: string
  summary: string
  buttonTitle: string
  onPress: () => void
}> = ({ title, summary, buttonTitle, onPress }) => {
  return (
    <VStack
      spacing={10}
      padding={16}
      frame={{ maxWidth: 'infinity', alignment: 'leading' }}
      background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 18 } }}
    >
      <Text font="headline">{title}</Text>
      <Text foregroundStyle="secondary">{summary}</Text>
      <HStack>
        <Spacer />
        <Button title={buttonTitle} buttonStyle="borderedProminent" onPress={onPress} />
      </HStack>
    </VStack>
  )
}

export const SwatchCard: FC<{
  title: string
  tone: 'blue' | 'green' | 'red'
  capsule?: boolean
  rectangle?: boolean
}> = ({ title, tone, capsule, rectangle }) => {
  return (
    <VStack
      spacing={10}
      padding={14}
      frame={{ width: 160, alignment: 'leading' }}
      background={{
        fill: tone,
        in: rectangle ? { kind: 'rectangle' } : capsule ? { kind: 'capsule' } : { kind: 'roundedRectangle', cornerRadius: 18 },
      }}
    >
      <Text foregroundColor="#ffffff" font="headline">
        {title}
      </Text>
      <Text foregroundColor="rgba(255,255,255,0.86)" font="caption">
        shape token
      </Text>
    </VStack>
  )
}

export const GalleryRow: FC<{
  title: string
  meta: string
}> = ({ title, meta }) => {
  return (
    <HStack
      spacing={10}
      padding={12}
      frame={{ maxWidth: 'infinity', alignment: 'leading' }}
      background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 14 } }}
    >
      <VStack spacing={2} alignment="leading" frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
        <Text>{title}</Text>
        <Text font="caption" foregroundStyle="secondary">
          {meta}
        </Text>
      </VStack>
      <Label title="ready" systemImage="pin.fill" />
    </HStack>
  )
}

export const MetricCard: FC<{
  title: string
  value: string
  meta: string
  tone: 'blue' | 'green' | 'red'
}> = ({ title, value, meta, tone }) => {
  return (
    <VStack
      spacing={6}
      padding={16}
      frame={{ width: 220, alignment: 'leading' }}
      background={{ fill: tone, in: { kind: 'roundedRectangle', cornerRadius: 18 } }}
    >
      <Text foregroundColor="rgba(255,255,255,0.82)" font="caption">
        {title}
      </Text>
      <Text foregroundColor="#ffffff" font="title">
        {value}
      </Text>
      <Text foregroundColor="rgba(255,255,255,0.82)" font="caption">
        {meta}
      </Text>
    </VStack>
  )
}

export const Chip: FC<{
  title: string
}> = ({ title }) => {
  return (
    <Text
      padding={{ horizontal: 10, vertical: 6 }}
      background={{ fill: 'thinMaterial', in: { kind: 'capsule' } }}
      font="caption.semibold"
    >
      {title}
    </Text>
  )
}

export const CodePanel: FC<{
  children: string
}> = ({ children }) => {
  return (
    <Text
      font="caption2.monospaced"
      textSelection="enabled"
      padding={12}
      frame={{ maxWidth: 'infinity', alignment: 'leading' }}
      background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 14 } }}
    >
      {children}
    </Text>
  )
}
