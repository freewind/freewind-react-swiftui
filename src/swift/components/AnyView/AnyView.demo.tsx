import type { FC } from 'react'
import { FormSection } from '../../controls'
import { AnyView } from './AnyView'
import { Button } from '../Button'
import { Image, Text, useBinding } from '../runtime'
import { VStack } from '../VStack'

export const AnyViewDemo: FC = () => {
  const toggled = useBinding(false)
  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="AnyView">
        <VStack spacing={12} alignment="leading">
          <Button title="toggle wrapped view" buttonStyle="bordered" onPress={() => toggled.setValue(!toggled.value)} />
          <AnyView>{toggled.value ? <Image systemName="photo" /> : <Text>Wrapped text view</Text>}</AnyView>
        </VStack>
      </FormSection>
    </VStack>
  )
}
