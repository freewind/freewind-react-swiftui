import type { FC } from 'react'
import { Group } from './Group'
import { Text } from '../runtime'
import { VStack } from '../VStack'
import {FormSection} from "../FormSection";

export const GroupDemo: FC = () => {
  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="Group">
        <Group>
          <VStack spacing={8} alignment="leading">
            <Text>Group keeps structure without extra wrapper style.</Text>
            <Text foregroundStyle="secondary">常用于条件拼接视图。</Text>
          </VStack>
        </Group>
      </FormSection>
    </VStack>
  )
}
