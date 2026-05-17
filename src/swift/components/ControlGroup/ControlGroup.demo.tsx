import type { FC } from 'react'
import { ControlGroup } from './ControlGroup'
import { Button } from '../Button'
import { VStack } from '../VStack'
import {FormSection} from "../FormSection";

export const ControlGroupDemo: FC = () => {
  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="ControlGroup">
        <ControlGroup>
          <Button title="Back" buttonStyle="bordered" />
          <Button title="Forward" buttonStyle="bordered" />
          <Button title="Share" buttonStyle="borderedProminent" />
        </ControlGroup>
      </FormSection>
    </VStack>
  )
}
