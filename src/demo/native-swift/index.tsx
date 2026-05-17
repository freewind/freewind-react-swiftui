import type { FC } from 'react'
import { FormSection, Text, VStack } from '../../swift'

export const NativeSwiftSourceDemo: FC = () => {
  return (
    <FormSection title="真实 Swift 代码">
      <VStack spacing={10} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
        <Text>native swift source stub</Text>
        <Text font="caption" foregroundStyle="secondary">
          后续这里接真实 Swift 源、mock 预览、packet、draft 并排展示。
        </Text>
      </VStack>
    </FormSection>
  )
}
