import type { FC } from 'react'
import { FormSection } from './components/FormSection'
import { Text } from './components/Text'

export const ComponentPropsTable: FC<{ component: string }> = ({ component }) => {
  return (
    <FormSection title={`${component} Props`}>
      <Text foregroundStyle="secondary">
        props table stub。后续按 OpenSwiftUI 参数面补全。
      </Text>
    </FormSection>
  )
}
