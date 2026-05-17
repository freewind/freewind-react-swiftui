import type { FC } from 'react'
import { ColorPicker } from '../ColorPicker/ColorPicker'
import { FormSection } from '../../controls'
import { DatePicker } from './DatePicker'
import { Text, useBinding } from '../runtime'
import { VStack } from '../VStack'

export const DatePickerDemo: FC = () => {
  const date = useBinding('2026-05-17T20:30')
  const color = useBinding('#0a84ff')
  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="DatePicker / ColorPicker">
        <VStack spacing={12} alignment="leading">
          <DatePicker selection={date} mode="dateAndTime" />
          <Text font="caption2.monospaced" foregroundStyle="secondary">{date.value}</Text>
          <ColorPicker selection={color} title="accent" />
        </VStack>
      </FormSection>
    </VStack>
  )
}
