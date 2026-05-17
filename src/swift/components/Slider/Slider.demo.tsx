import type { FC } from 'react'
import { HStack, Slider, Text, useBinding } from '../runtime'
import { FormSection } from '../../controls'
import { PlaygroundSection } from '../../demo-playground'
import { ComponentPropsTable } from '../../props-table'
import {VStack} from "../VStack";

export const SliderDemo: FC = () => {
  const zoom = useBinding(80)

  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="基础滑杆">
        <VStack spacing={10} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
          <Slider value={zoom} in={[10, 200]} step={5} />
          <Text font="caption" foregroundStyle="secondary">zoom: {String(zoom.value)}%</Text>
        </VStack>
      </FormSection>
      <PlaygroundSection
        title="带两端标签"
        summary="常用于缩放、音量、透明度、阈值控制。"
        preview={
          <VStack spacing={8} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
            <HStack spacing={10} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
              <Text font="caption">10%</Text>
              <Slider value={zoom} in={[10, 200]} step={10} frame={{ maxWidth: 'infinity' }} />
              <Text font="caption">200%</Text>
            </HStack>
            <Text font="caption" foregroundStyle="secondary">current: {String(zoom.value)}%</Text>
          </VStack>
        }
      />
      <ComponentPropsTable component="Slider" />
    </VStack>
  )
}
