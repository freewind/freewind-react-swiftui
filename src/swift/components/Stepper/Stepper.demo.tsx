import type { FC } from 'react'
import { Stepper, Text, useBinding } from '../runtime'
import { PlaygroundSection } from '../../demo-playground'
import { ComponentPropsTable } from '../../props-table'
import {VStack} from "../VStack";
import {FormSection} from "../FormSection";

export const StepperDemo: FC = () => {
  const count = useBinding(2)

  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="基础步进器">
        <Stepper
          value={count}
          in={[0, 10]}
          step={1}
          label={<Text>Concurrent Uploads</Text>}
          valueLabel={<Text font="caption" foregroundStyle="secondary">{String(count.value)} jobs</Text>}
          tint="blue"
        />
      </FormSection>
      <PlaygroundSection
        title="批量操作参数"
        summary="适合整数配置、份数、并发数、重试次数。"
        preview={
          <VStack spacing={10} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
            <Stepper value={count} in={[1, 8]} step={1} title="Retry Count" controlSize="mini" />
            <Stepper value={count} in={[0, 20]} step={2} title="Max Peers" labelsHidden />
          </VStack>
        }
      />
      <ComponentPropsTable component="Stepper" />
    </VStack>
  )
}
