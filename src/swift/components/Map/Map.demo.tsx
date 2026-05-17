import type { FC } from 'react'
import { FormSection } from '../../controls'
import { Map } from './Map'
import { WebView } from '../WebView/WebView'
import { VStack } from '../VStack'

export const MapDemo: FC = () => {
  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="Map / WebView">
        <VStack spacing={14}>
          <Map title="Shanghai" annotationTitle="People's Square" latitude={31.2304} longitude={121.4737} />
          <WebView title="SwiftUI Docs" src="https://developer.apple.com/xcode/swiftui/" frame={{ height: 240, maxWidth: 'infinity' }} />
        </VStack>
      </FormSection>
    </VStack>
  )
}
