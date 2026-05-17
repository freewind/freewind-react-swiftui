import type { FC } from 'react'
import { WindowGroup } from './WindowGroup'
import { Text } from '../runtime'
import {FormSection} from "../FormSection";

export const WindowGroupDemo: FC = () => {
  return (
    <FormSection title="WindowGroup">
      <WindowGroup minWidth={360} minHeight={220} title="Preview Window" subtitle="macOS chrome shell">
        <Text>Window scoped root shell.</Text>
      </WindowGroup>
    </FormSection>
  )
}
