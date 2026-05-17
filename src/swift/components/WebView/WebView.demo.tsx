import type { FC } from 'react'
import { FormSection } from '../../controls'
import { WebView } from './WebView'
import { VStack } from '../VStack'

export const WebViewDemo: FC = () => {
  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="WebView">
        <WebView title="Apple Developer" src="https://developer.apple.com/xcode/swiftui/" frame={{ height: 320, maxWidth: 'infinity' }} />
      </FormSection>
    </VStack>
  )
}
