import type { FC } from 'react'
import { FormSection } from '../../controls'
import { ShareLink } from './ShareLink'
import { Text } from '../runtime'
import { VStack } from '../VStack'

export const ShareLinkDemo: FC = () => {
  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="ShareLink">
        <VStack spacing={10} alignment="leading">
          <ShareLink title="share article" text="SwiftUI Catalog" url="https://developer.apple.com/xcode/swiftui/" />
          <Text font="caption" foregroundStyle="secondary">无系统 share 时回退 clipboard。</Text>
        </VStack>
      </FormSection>
    </VStack>
  )
}
