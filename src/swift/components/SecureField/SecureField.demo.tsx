import type { FC } from 'react'
import { SecureField } from './SecureField'
import { Text, useBinding } from '../runtime'
import { VStack } from '../VStack'
import {FormSection} from "../FormSection";

export const SecureFieldDemo: FC = () => {
  const password = useBinding('hunter2')
  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="SecureField">
        <VStack spacing={10} alignment="leading">
          <SecureField text={password} placeholder="password" textFieldStyle="roundedBorder" />
          <Text font="caption" foregroundStyle="secondary">长度：{String(password.value.length)}</Text>
        </VStack>
      </FormSection>
    </VStack>
  )
}
