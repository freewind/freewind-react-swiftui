import type { FC } from 'react'
import { FormSection } from '../../controls'
import { Commands } from './Commands'
import { Button } from '../Button'
import { Text } from '../runtime'
import { VStack } from '../VStack'

export const CommandsDemo: FC = () => {
  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="Commands">
        <Commands>
          <Text font="caption.semibold">File</Text>
          <Button title="New Window" buttonStyle="plain" frame={{ maxWidth: 'infinity', alignment: 'leading' }} />
          <Button title="Close" buttonStyle="plain" frame={{ maxWidth: 'infinity', alignment: 'leading' }} />
        </Commands>
      </FormSection>
    </VStack>
  )
}
