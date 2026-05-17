import type { FC } from 'react'
import { FormSection } from '../../controls'
import { HelpLink } from './HelpLink'
import { VStack } from '../VStack'

export const HelpLinkDemo: FC = () => {
  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="HelpLink">
        <HelpLink destination="https://developer.apple.com/documentation/swiftui" title="Open SwiftUI help" />
      </FormSection>
    </VStack>
  )
}
