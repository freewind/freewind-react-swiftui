import type { FC } from 'react'
import { LazyHGrid } from './LazyHGrid'
import { RoundedRectangle, Text } from '../runtime'
import { VStack } from '../VStack'
import {FormSection} from "../FormSection";

export const LazyHGridDemo: FC = () => {
  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="LazyHGrid">
        <LazyHGrid rows={2} spacing={10} frame={{ maxWidth: 'infinity' }}>
          {Array.from({ length: 8 }).map((_, index) => (
            <RoundedRectangle key={index} fill="thinMaterial" frame={{ width: 120, height: 72 }} padding={10}>
              <Text>Card {String(index + 1)}</Text>
            </RoundedRectangle>
          ))}
        </LazyHGrid>
      </FormSection>
    </VStack>
  )
}
