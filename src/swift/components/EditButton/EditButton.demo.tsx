import type { FC } from 'react'
import { EditButton } from './EditButton'
import { PasteButton } from '../PasteButton/PasteButton'
import { FormSection } from '../../controls'
import { Text, useBinding } from '../runtime'
import { TextField } from '../TextField'
import { VStack } from '../VStack'

export const EditButtonDemo: FC = () => {
  const isEditing = useBinding(false)
  const pasted = useBinding('')

  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="Edit / Paste">
        <VStack spacing={12} alignment="leading">
          <EditButton isEditing={isEditing} />
          <Text foregroundStyle="secondary">{isEditing.value ? '当前：编辑态' : '当前：普通态'}</Text>
          <PasteButton text={pasted} />
          <TextField text={pasted} placeholder="clipboard text" textFieldStyle="roundedBorder" />
        </VStack>
      </FormSection>
    </VStack>
  )
}
