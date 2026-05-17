import type { FC } from 'react'
import { FormSection } from '../FormSection'
import { HStack } from '../HStack'
import { Text } from '../Text'
import { VStack } from '../VStack'

const rows = [
  ['primary', '主文本'],
  ['secondary', '次文本'],
  ['accentColor', '强调色'],
] as const

export const TokenColorDemo: FC = () => {
  return (
    <FormSection title="TokenColor">
      <VStack spacing={10} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
        {rows.map(([token, label]) => (
          <HStack
            key={token}
            spacing={12}
            padding={12}
            frame={{ maxWidth: 'infinity', alignment: 'leading' }}
            background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 14 } }}
          >
            <Text font="caption2.monospaced" frame={{ width: 140, alignment: 'leading' }}>
              {token}
            </Text>
            <Text foregroundStyle={token}>{label}</Text>
          </HStack>
        ))}
      </VStack>
    </FormSection>
  )
}
