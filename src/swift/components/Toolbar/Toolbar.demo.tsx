import type { FC } from 'react'
import { FormSection } from '../../controls'
import { Toolbar } from './Toolbar'
import { Button } from '../Button'
import { VStack } from '../VStack'

export const ToolbarDemo: FC = () => {
  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="Toolbar">
        <Toolbar>
          <Button title="Compose" buttonStyle="borderedProminent" />
          <Button title="Archive" buttonStyle="bordered" />
          <Button title="More" buttonStyle="plain" />
        </Toolbar>
      </FormSection>
    </VStack>
  )
}
