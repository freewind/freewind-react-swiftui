import type { FC } from 'react'
import { FormSection } from '../../controls'
import { OutlineGroup } from './OutlineGroup'
import { TimelineView } from '../TimelineView/TimelineView'
import { Text } from '../runtime'
import { VStack } from '../VStack'

type TreeNode = {
  id: string
  title: string
  children?: TreeNode[]
}

const nodes: TreeNode[] = [
  { id: '1', title: 'Design', children: [{ id: '1-1', title: 'Icons' }, { id: '1-2', title: 'Mockups' }] },
  { id: '2', title: 'Engineering', children: [{ id: '2-1', title: 'runtime.tsx' }, { id: '2-2', title: 'translator' }] },
]

export const OutlineGroupDemo: FC = () => {
  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="OutlineGroup / TimelineView">
        <VStack spacing={12} alignment="leading">
          <OutlineGroup
            items={nodes}
            id={item => item.id}
            label={item => <Text>{item.title}</Text>}
            childrenOf={item => item.children}
          />
          <TimelineView intervalMs={1000}>
            {({ date }) => <Text font="caption2.monospaced" foregroundStyle="secondary">{date.toLocaleTimeString()}</Text>}
          </TimelineView>
        </VStack>
      </FormSection>
    </VStack>
  )
}
