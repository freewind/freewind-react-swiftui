import type { FC } from 'react'
import { FormSection } from '../../controls'
import { TimelineView } from './TimelineView'
import { Text } from '../runtime'
import { VStack } from '../VStack'

export const TimelineViewDemo: FC = () => {
  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="TimelineView">
        <TimelineView intervalMs={1000}>
          {({ date }) => <Text font="title3.semibold">{date.toLocaleTimeString()}</Text>}
        </TimelineView>
      </FormSection>
    </VStack>
  )
}
