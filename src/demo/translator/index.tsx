import type { FC } from 'react'
import { FormSection, Text, VStack } from '../../swift'

export const TranslatorSpecDemo: FC = () => {
  return (
    <FormSection title="转换规约">
      <VStack spacing={10} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
        <Text>translator stub</Text>
        <Text font="caption" foregroundStyle="secondary">
          后续这里展示 export packet、mapping、prompt、SwiftUI draft。
        </Text>
      </VStack>
    </FormSection>
  )
}
