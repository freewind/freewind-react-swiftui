import { useMemo, useState, type FC, type ReactNode } from 'react'
import { HStack, Sheet, Spacer, Text, TextEditor, TextField, type Binding } from './runtime'
import { Button } from './components/Button'
import { VStack } from './components/VStack'

export type ObservableObject<T extends object> = {
  value: T
  setValue: (updater: T | ((prev: T) => T)) => void
}

export const useStateObject = <T extends object>(initialValue: T): ObservableObject<T> => {
  const [value, setValue] = useState(initialValue)

  return useMemo(
    () => ({
      value,
      setValue: updater => {
        setValue(prev => (typeof updater === 'function' ? (updater as (prev: T) => T)(prev) : updater))
      },
    }),
    [value],
  )
}

export const binding = <T,>(value: T, setValue: (next: T) => void): Binding<T> => ({
  value,
  setValue,
})

export const FormSection: FC<{
  title: string
  children: ReactNode
}> = ({ title, children }) => {
  return (
    <VStack
      spacing={10}
      padding={14}
      frame={{ maxWidth: 'infinity', alignment: 'leading' }}
      background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 16 } }}
    >
      <Text font="headline">{title}</Text>
      {children}
    </VStack>
  )
}

export const SheetActions: FC<{
  onCancel?: () => void
  onConfirm?: () => void
  cancelTitle?: string
  confirmTitle?: string
}> = ({ onCancel, onConfirm, cancelTitle = '取消', confirmTitle = '保存' }) => {
  return (
    <HStack spacing={10}>
      <Spacer />
      <Button title={cancelTitle} buttonStyle="bordered" onPress={onCancel} />
      <Button title={confirmTitle} buttonStyle="borderedProminent" onPress={onConfirm} />
    </HStack>
  )
}

export const TextFieldRow: FC<{
  label: string
  text: Binding<string>
  placeholder?: string
}> = ({ label, text, placeholder }) => {
  return (
    <VStack spacing={6} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <Text font="caption" foregroundStyle="secondary">
        {label}
      </Text>
      <TextField text={text} placeholder={placeholder} textFieldStyle="roundedBorder" />
    </VStack>
  )
}

export const TextEditorSheet: FC<{
  title: string
  isPresented: Binding<boolean>
  text: Binding<string>
  onConfirm?: () => void
}> = ({ title, isPresented, text, onConfirm }) => {
  return (
    <Sheet isPresented={isPresented}>
      <VStack
        spacing={12}
        padding={20}
        frame={{ width: 420, height: 260 }}
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
