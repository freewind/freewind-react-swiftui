import type { FC } from 'react'
import { Circle } from '../Circle/Circle'
import { FormSection } from '../../controls'
import { Gradient } from '../Gradient/Gradient'
import { MeshGradient } from '../MeshGradient/MeshGradient'
import { Canvas } from './Canvas'
import { HStack, Text } from '../runtime'
import { VStack } from '../VStack'

export const CanvasDemo: FC = () => {
  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="Canvas / Gradient / MeshGradient / Circle">
        <VStack spacing={14}>
          <Canvas
            frame={{ width: 280, height: 120 }}
            draw={(context, size) => {
              context.fillStyle = '#0a84ff'
              context.fillRect(0, 0, size.width, size.height)
              context.fillStyle = 'rgba(255,255,255,0.65)'
              context.beginPath()
              context.arc(size.width / 2, size.height / 2, 32, 0, Math.PI * 2)
              context.fill()
            }}
          />
          <HStack spacing={12}>
            <Gradient colors={['#0a84ff', '#7c3aed']} frame={{ width: 120, height: 80 }} />
            <MeshGradient colors={['#0ea5e9', '#8b5cf6', '#f43f5e']} frame={{ width: 120, height: 80 }} />
            <Circle fill="green" frame={{ width: 80, height: 80 }} />
          </HStack>
          <Text font="caption" foregroundStyle="secondary">视觉类组件先提供浏览器基线表达。</Text>
        </VStack>
      </FormSection>
    </VStack>
  )
}
