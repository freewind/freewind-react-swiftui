import type { FC } from 'react'
import { FormSection } from '../../controls'
import { ColorPicker } from './ColorPicker'
import { Text, useBinding } from '../runtime'
import { VStack } from '../VStack'

export const ColorPickerDemo: FC = () => {
  const picked = useBinding('#34c759')
  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="ColorPicker">
        <VStack spacing={12} alignment="leading">
          <ColorPicker selection={picked} title="theme" />
          <Text>{`picked color: ${picked.value}`}</Text>
          <Text font="caption2.monospaced" foregroundStyle="secondary">{picked.value}</Text>
        </VStack>
      </FormSection>
    </VStack>
  )
}
