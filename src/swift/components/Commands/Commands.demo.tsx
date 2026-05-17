import type { FC } from 'react'
import { Commands } from './Commands'
import { Button } from '../Button'
import { Text } from '../runtime'
import { VStack } from '../VStack'
import { FormSection } from '../FormSection'

export const CommandsDemo: FC = () => {
  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="Commands">
        <Commands title="File">
          <Button title="New Window" buttonStyle="plain" frame={{ maxWidth: 'infinity', alignment: 'leading' }} />
          <Button title="Close" buttonStyle="plain" frame={{ maxWidth: 'infinity', alignment: 'leading' }} />
        </Commands>
        <Commands title="Edit">
          <Button title="Undo" buttonStyle="plain" frame={{ maxWidth: 'infinity', alignment: 'leading' }} />
          <Button title="Redo" buttonStyle="plain" frame={{ maxWidth: 'infinity', alignment: 'leading' }} />
          <Text font="caption" foregroundStyle="secondary">
            command menu stub
          </Text>
        </Commands>
      </FormSection>
    </VStack>
  )
}
