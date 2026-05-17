import type { FC } from 'react'
import { Button, SecureField, Text, useBinding, useFocusState } from '../runtime'
import { VStack } from '../VStack'
import { FormSection } from '../FormSection'

export const SecureFieldDemo: FC = () => {
  const password = useBinding('hunter2')
  const focus = useFocusState<string | null>('password')
  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="SecureField">
        <VStack spacing={10} alignment="leading">
          <SecureField text={password} placeholder="password" textFieldStyle="roundedBorder" focused={focus} equals="password" submitLabel="done" />
          <Text font="caption" foregroundStyle="secondary">长度：{String(password.value.length)}</Text>
          <Text font="caption" foregroundStyle="secondary">focused: {focus.value ?? 'none'}</Text>
          <Button title="Focus password" buttonStyle="bordered" onPress={() => focus.setValue('password')} />
        </VStack>
      </FormSection>
    </VStack>
  )
}
