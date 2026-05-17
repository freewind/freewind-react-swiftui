import type { FC } from 'react'
import { FormSection } from '../../controls'
import { ImmersiveSpace } from './ImmersiveSpace'
import { Text } from '../runtime'
import { VStack } from '../VStack'

export const ImmersiveSpaceDemo: FC = () => {
  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="ImmersiveSpace">
        <ImmersiveSpace frame={{ height: 220 }}>
          <Text font="title3.semibold">visionOS style canvas shell</Text>
        </ImmersiveSpace>
      </FormSection>
    </VStack>
  )
}
