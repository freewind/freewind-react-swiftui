import type { FC, ReactNode } from 'react'
import { Text } from './runtime'
import { FormSection } from './controls'
import {VStack} from "./VStack";

export const PlaygroundSection: FC<{
  title: string
  summary?: string
  preview: ReactNode
}> = ({ title, summary, preview }) => {
  return (
    <FormSection title={title}>
      <VStack spacing={12} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
        <Text font="caption" foregroundStyle="secondary">
          {summary ?? `当前例子：${title}。`}
        </Text>
        <VStack
          spacing={10}
          padding={12}
          frame={{ maxWidth: 'infinity', alignment: 'leading' }}
          background={{ fill: 'ultraThinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 16 } }}
        >
          {preview}
        </VStack>
      </VStack>
    </FormSection>
  )
}
