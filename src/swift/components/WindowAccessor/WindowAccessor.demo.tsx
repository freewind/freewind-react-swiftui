import type { FC } from 'react'
import { FormSection } from '../FormSection'
import { Text } from '../Text'
import { VStack } from '../VStack'

export const WindowAccessorDemo: FC = () => {
  return (
    <FormSection title="WindowAccessor">
      <VStack spacing={8} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
        <Text>当前版本仅保留窗口语义占位。</Text>
        <Text foregroundStyle="secondary">真实窗口句柄访问应下沉到 runtime / native bridge。</Text>
      </VStack>
    </FormSection>
  )
}
