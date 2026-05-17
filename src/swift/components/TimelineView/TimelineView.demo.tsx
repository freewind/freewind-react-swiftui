import type { FC } from 'react'
import { FormSection } from '../../controls'
import { TimelineView } from './TimelineView'
import { Text } from '../runtime'
import { VStack } from '../VStack'

export const TimelineViewDemo: FC = () => {
  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="TimelineView">
        <TimelineView schedule="animation">
          {({ date, cadence }) => <Text font="title3.semibold">{`${date.toLocaleTimeString()} · ${cadence}`}</Text>}
        </TimelineView>
      </FormSection>
    </VStack>
  )
}
