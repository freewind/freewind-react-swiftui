import type { FC } from 'react'
import { FormSection } from '../../controls'
import { FullScreenCover } from './FullScreenCover'
import { Button } from '../Button'
import { Text } from '../runtime'
import { useBinding } from '../runtime'
import { VStack } from '../VStack'

export const FullScreenCoverDemo: FC = () => {
  const shown = useBinding(false)
  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="FullScreenCover">
        <Button title="present cover" buttonStyle="borderedProminent" onPress={() => shown.setValue(true)} />
        <FullScreenCover isPresented={shown} title="Immersive Preview">
          <VStack
            spacing={12}
            padding={20}
            frame={{ maxWidth: 'infinity', minHeight: 300, alignment: 'leading' }}
            background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 20 } }}
          >
            <Text font="headline.semibold">Full screen content</Text>
            <Text foregroundStyle="secondary">适合完整任务流或媒体预览。</Text>
          </VStack>
        </FullScreenCover>
      </FormSection>
    </VStack>
  )
}
