import type { FC } from 'react'
import { ConfirmationDialog } from './ConfirmationDialog'
import { Button } from '../Button'
import { useBinding } from '../runtime'
import { VStack } from '../VStack'
import {FormSection} from "../FormSection";

export const ConfirmationDialogDemo: FC = () => {
  const presented = useBinding(false)
  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="ConfirmationDialog">
        <Button title="show dialog" buttonStyle="borderedProminent" onPress={() => presented.setValue(true)} />
        <ConfirmationDialog
          isPresented={presented}
          title="选择操作"
          message="这些操作会立即影响当前会话。"
          actions={[
            { title: '置顶' },
            { title: '删除', role: 'destructive' },
          ]}
        />
      </FormSection>
    </VStack>
  )
}
