import type { FC } from 'react'
import { HelpLink } from '../HelpLink/HelpLink'
import { ShareLink } from '../ShareLink/ShareLink'
import { Link } from './Link'
import { Text } from '../runtime'
import { VStack } from '../VStack'
import {FormSection} from "../FormSection";

export const LinkDemo: FC = () => {
  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="Link / ShareLink / HelpLink">
        <VStack spacing={12} alignment="leading">
          <Link destination="https://developer.apple.com/xcode/swiftui/" title="SwiftUI Docs" />
          <ShareLink title="share docs" text="SwiftUI docs" url="https://developer.apple.com/xcode/swiftui/" />
          <HelpLink destination="https://developer.apple.com/documentation/swiftui" title="打开帮助" />
          <Text font="caption" foregroundStyle="secondary">不支持系统 share 时，回退复制文本到 clipboard。</Text>
        </VStack>
      </FormSection>
    </VStack>
  )
}
