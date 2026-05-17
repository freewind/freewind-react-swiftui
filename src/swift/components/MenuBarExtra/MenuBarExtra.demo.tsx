import type { FC } from 'react'
import { MenuBarExtra } from './MenuBarExtra'
import { Button } from '../Button'
import { VStack } from '../VStack'
import {FormSection} from "../FormSection";

export const MenuBarExtraDemo: FC = () => {
  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="MenuBarExtra">
        <MenuBarExtra
          label={<Button title="Menu Bar" buttonStyle="bordered" />}
          items={[{ title: 'Open' }, { title: 'Quit' }]}
        />
      </FormSection>
    </VStack>
  )
}
