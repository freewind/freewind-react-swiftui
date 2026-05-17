import type { FC } from 'react'
import { FormSection } from '../../controls'
import { ForEach, RoundedRectangle, Text } from '../runtime'
import { VStack } from '../VStack'

const tags = ['SwiftUI', 'Binding', 'Sheet', 'Popover']

export const ForEachDemo: FC = () => {
  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="ForEach">
        <VStack spacing={10} alignment="leading">
          <ForEach each={tags} keyBy={item => item}>
            {item => (
              <RoundedRectangle key={item} fill="thinMaterial" frame={{ maxWidth: 'infinity' }} padding={10}>
                <Text>{item}</Text>
              </RoundedRectangle>
            )}
          </ForEach>
        </VStack>
      </FormSection>
    </VStack>
  )
}
