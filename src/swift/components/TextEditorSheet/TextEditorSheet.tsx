import type { FC } from 'react'
import type { Binding } from '../../types'
import { Sheet } from '../Sheet'
import { VStack } from '../VStack'
import { Text } from '../Text'
import { TextEditor } from '../TextEditor'
import { SheetActions } from '../SheetActions'

export const TextEditorSheet: FC<{
  title: string
  isPresented: Binding<boolean>
  text: Binding<string>
  onConfirm?: () => void
}> = ({ title, isPresented, text, onConfirm }) => {
  return (
    <Sheet data-type="TextEditorSheet" isPresented={isPresented}>
      <VStack
        spacing={12}
        padding={20}
        frame={{width: 420, height: 260}}
        background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 20 } }}
      >
        <Text font="headline">{title}</Text>
        <TextEditor text={text} frame={{ maxWidth: 'infinity', maxHeight: 'infinity' }} />
        <SheetActions
          onCancel={() => isPresented.setValue(false)}
          onConfirm={() => {
            onConfirm?.()
            isPresented.setValue(false)
          }}
        />
      </VStack>
    </Sheet>
  )
}
