import type { FC } from 'react'
import { Gauge } from './Gauge'
import { Slider, Text, useBinding } from '../runtime'
import { VStack } from '../VStack'
import {FormSection} from "../FormSection";

export const GaugeDemo: FC = () => {
  const value = useBinding(42)
  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="Gauge">
        <VStack spacing={12} alignment="leading">
          <Gauge value={value.value} total={100} label="Battery" currentValueLabel={`${String(value.value)}%`} />
          <Slider value={value} in={[0, 100]} />
          <Text font="caption" foregroundStyle="secondary">用现有 `ProgressView` 语义包装成仪表视图。</Text>
        </VStack>
      </FormSection>
    </VStack>
  )
}
