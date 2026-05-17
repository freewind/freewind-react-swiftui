import type { FC } from 'react'
import { FormSection } from '../../controls'
import { PasteButton } from './PasteButton'
import { TextField } from '../TextField'
import { useBinding } from '../runtime'
import { VStack } from '../VStack'

export const PasteButtonDemo: FC = () => {
  const text = useBinding('')
  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="PasteButton">
        <VStack spacing={12} alignment="leading">
          <PasteButton text={text} />
          <TextField text={text} placeholder="paste target" textFieldStyle="roundedBorder" />
        </VStack>
      </FormSection>
    </VStack>
  )
}
