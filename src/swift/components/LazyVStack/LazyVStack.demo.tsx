import type { FC } from 'react'
import { FormSection } from '../../controls'
import { LazyVStack } from './LazyVStack'
import { RoundedRectangle, Text } from '../runtime'
import { VStack } from '../VStack'

export const LazyVStackDemo: FC = () => {
  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="LazyVStack">
        <LazyVStack spacing={10} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
          {Array.from({ length: 6 }).map((_, index) => (
            <RoundedRectangle key={index} fill="thinMaterial" frame={{ maxWidth: 'infinity' }} padding={12}>
              <Text>Row {String(index + 1)}</Text>
            </RoundedRectangle>
          ))}
        </LazyVStack>
      </FormSection>
    </VStack>
  )
}
