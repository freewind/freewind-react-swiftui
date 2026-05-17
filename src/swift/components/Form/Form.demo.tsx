import type { FC } from 'react'
import { ControlGroup } from '../ControlGroup/ControlGroup'
import { Group } from '../Group/Group'
import { GroupBox } from '../GroupBox/GroupBox'
import { Form } from './Form'
import { Button } from '../Button'
import { Section, Text } from '../runtime'
import { VStack } from '../VStack'

export const FormDemo: FC = () => {
  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <Form spacing={14}>
        <Section title="账户">
          <Group>
            <Text>Apple ID</Text>
            <Text foregroundStyle="secondary">freewind@example.com</Text>
          </Group>
        </Section>
        <GroupBox title="操作">
          <ControlGroup>
            <Button title="刷新" buttonStyle="bordered" />
            <Button title="同步" buttonStyle="borderedProminent" />
          </ControlGroup>
        </GroupBox>
      </Form>
    </VStack>
  )
}
