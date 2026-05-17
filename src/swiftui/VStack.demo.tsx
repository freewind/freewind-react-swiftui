import type { FC } from 'react'
import { Text, useBinding, VStack } from './runtime'
import { FormSection } from './controls'
import { EnumField, NumberField, PlaygroundSection, toNumber } from './demo-playground'

export const VStackDemo: FC = () => {
  const spacing = useBinding('8')
  const alignment = useBinding<'leading' | 'center' | 'trailing'>('leading')

  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="静态例子">
        <VStack spacing={8} alignment="leading" padding={12} background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 16 } }}>
          <Text>row 1</Text>
          <Text>row 2</Text>
          <Text>row 3</Text>
        </VStack>
      </FormSection>
      <PlaygroundSection
        title="VStack Playground"
        preview={
          <VStack
            spacing={toNumber(spacing.value, 8)}
            alignment={alignment.value}
            padding={12}
            frame={{ maxWidth: 'infinity', alignment: 'leading' }}
            background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 16 } }}
          >
            <Text>row 1</Text>
            <Text>row 2</Text>
            <Text>row 3</Text>
          </VStack>
        }
        form={
          <>
            <NumberField label="spacing" binding={spacing} />
            <EnumField
              label="alignment"
              binding={alignment}
              options={[
                { label: 'leading', value: 'leading' },
                { label: 'center', value: 'center' },
                { label: 'trailing', value: 'trailing' },
              ]}
            />
          </>
        }
      />
    </VStack>
  )
}
