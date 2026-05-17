import type { FC } from 'react'
import { MeshGradient } from './MeshGradient'
import { Text } from '../runtime'
import { VStack } from '../VStack'
import {FormSection} from "../FormSection";

export const MeshGradientDemo: FC = () => {
  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="MeshGradient">
        <MeshGradient colors={['#06b6d4', '#8b5cf6', '#fb7185']} frame={{ width: 320, height: 180 }} padding={16}>
          <Text foregroundColor="#ffffff">Mesh-like background</Text>
        </MeshGradient>
      </FormSection>
    </VStack>
  )
}
