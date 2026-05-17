import type { FC } from 'react'
import { RoundedRectangle, Text, useBinding, VStack, type ForegroundStyleToken } from './runtime'
import { FormSection } from './controls'
import { EnumField, NumberField, PlaygroundSection, toNumber } from './demo-playground'
import { foregroundOptions } from './demo-shared'

export const RoundedRectangleDemo: FC = () => {
  const fill = useBinding<ForegroundStyleToken>('accentColor')
  const cornerRadius = useBinding('18')

  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="静态例子">
        <RoundedRectangle fill="blue" cornerRadius={18} padding={18} frame={{ width: 220 }}>
          <Text foregroundColor="#ffffff">RoundedRectangle</Text>
        </RoundedRectangle>
      </FormSection>
      <PlaygroundSection
        title="RoundedRectangle Playground"
        preview={
          <RoundedRectangle fill={fill.value} cornerRadius={toNumber(cornerRadius.value, 18)} padding={18} frame={{ width: 220 }}>
            <Text foregroundColor="#ffffff">RoundedRectangle</Text>
          </RoundedRectangle>
        }
        form={
          <>
            <EnumField label="fill" binding={fill} options={foregroundOptions} />
            <NumberField label="cornerRadius" binding={cornerRadius} />
          </>
        }
      />
    </VStack>
  )
}
