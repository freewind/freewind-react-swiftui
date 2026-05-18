import type { FC } from 'react'
import type { Binding } from '../../types'
import { VStack } from '../VStack'
import { Text } from '../Text'
import { TextField } from '../TextField'

export const TextFieldRow: FC<{
  label: string
  text: Binding<string>
  placeholder?: string
}> = ({ label, text, placeholder }) => {
  return (
    <VStack data-type="TextFieldRow" spacing={6} frame={{maxWidth: 'infinity', alignment: 'leading'}}>
      <Text font="caption" foregroundStyle="secondary">
        {label}
      </Text>
      <TextField text={text} placeholder={placeholder} textFieldStyle="roundedBorder" />
    </VStack>
  )
}
