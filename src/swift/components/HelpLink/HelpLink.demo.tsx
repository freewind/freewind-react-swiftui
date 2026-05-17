import type { FC } from 'react'
import { HelpLink } from './HelpLink'
import { VStack } from '../VStack'
import {FormSection} from "../FormSection";

export const HelpLinkDemo: FC = () => {
  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="HelpLink">
        <HelpLink destination="https://developer.apple.com/documentation/swiftui" title="Open SwiftUI help" />
      </FormSection>
    </VStack>
  )
}
