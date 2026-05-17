import type { FC } from 'react'
import { Button, HStack, Label, Picker, Spacer, Text, type ThemeMode, useBinding, VStack } from '../swiftui'

export const AppHeader: FC<{
  title: string
  theme: ReturnType<typeof useBinding<ThemeMode>>
  canGoBack?: boolean
  onBack?: () => void
}> = ({ title, theme, canGoBack, onBack }) => {
  return (
    <HStack
      padding={{ horizontal: 18, vertical: 14 }}
      frame={{ maxWidth: 'infinity' }}
      background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 18 } }}
      spacing={14}
      alignment="center"
    >
      <HStack spacing={10} frame={{ width: 140, alignment: 'leading' }}>
        {canGoBack ? <Button title="返回" buttonStyle="bordered" onPress={onBack} /> : null}
      </HStack>
      <Text font="title3.semibold" frame={{ maxWidth: 'infinity' }} multilineTextAlignment="center">
        {title}
      </Text>
      <HStack frame={{ width: 180, alignment: 'trailing' }}>
        <Picker
          frame={{ width: 180 }}
          selection={theme}
          pickerStyle="segmented"
          options={[
            { label: 'Light', value: 'light' },
            { label: 'Dark', value: 'dark' },
          ]}
        />
      </HStack>
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
    <HStack
      spacing={16}
      padding={16}
      frame={{ maxWidth: 'infinity', alignment: 'leading' }}
      background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 18 } }}
      alignment="center"
    >
      <VStack spacing={4} alignment="leading" frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
        <Text font="headline">{title}</Text>
        <Text foregroundStyle="secondary">{summary}</Text>
      </VStack>
      <HStack>
        <Button title={buttonTitle} buttonStyle="borderedProminent" onPress={onPress} />
      </HStack>
    </HStack>
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
