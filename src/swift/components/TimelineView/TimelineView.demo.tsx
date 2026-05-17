import type { FC } from 'react'
import { TimelineView } from './TimelineView'
import { Text } from '../runtime'
import { VStack } from '../VStack'
import {FormSection} from "../FormSection";

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
