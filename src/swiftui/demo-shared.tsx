import type { FC } from 'react'
import { HStack, Label, Text, type FontToken, type ForegroundStyleToken } from './runtime'
import {VStack} from "./VStack";

export const fontOptions: Array<{ label: string; value: FontToken }> = [
  { label: 'largeTitle', value: 'largeTitle' },
  { label: 'title', value: 'title' },
  { label: 'title2', value: 'title2' },
  { label: 'headline', value: 'headline' },
  { label: 'body', value: 'body' },
  { label: 'caption', value: 'caption' },
  { label: 'mono', value: 'caption2.monospaced' },
]

export const foregroundOptions: Array<{ label: string; value: ForegroundStyleToken }> = [
  { label: 'primary', value: 'primary' },
  { label: 'secondary', value: 'secondary' },
  { label: 'tertiary', value: 'tertiary' },
  { label: 'red', value: 'red' },
  { label: 'green', value: 'green' },
  { label: 'blue', value: 'blue' },
  { label: 'accent', value: 'accentColor' },
]

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
