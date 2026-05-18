import type { FC } from 'react'
import { Button } from '../Button'
import { Sheet, Text, type Binding } from '../runtime'
import { VStack } from '../VStack'

export type ConfirmationDialogProps = {
  isPresented: Binding<boolean>
  title: string
  message?: string
  titleVisibility?: 'visible' | 'hidden'
  cancelTitle?: string
  actions: Array<{ title: string; role?: 'default' | 'destructive'; onPress?: () => void }>
}

export const ConfirmationDialog: FC<ConfirmationDialogProps> = ({
  isPresented,
  title,
  message,
  titleVisibility = 'visible',
  cancelTitle = '取消',
  actions,
}) => {
  return (
    <Sheet dataType="ConfirmationDialog" isPresented={isPresented} title="ConfirmationDialog" detents={['medium']}>
      <VStack
        spacing={8}
        padding={14}
        frame={{ width: 320, maxWidth: 'infinity' }}
        background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 20 } }}
      >
        {titleVisibility === 'visible' ? <Text font="headline.semibold">{title}</Text> : null}
        {message ? (
          <Text font="caption" foregroundStyle="secondary">
            {message}
          </Text>
        ) : null}
        {actions.map(action => (
          <Button
            key={action.title}
            title={action.title}
            buttonStyle={action.role === 'destructive' ? 'borderedProminent' : 'bordered'}
            onPress={() => {
              isPresented.setValue(false)
              action.onPress?.()
            }}
            frame={{ maxWidth: 'infinity', alignment: 'leading' }}
          />
        ))}
        <Button title={cancelTitle} buttonStyle="plain" onPress={() => isPresented.setValue(false)} frame={{ maxWidth: 'infinity', alignment: 'leading' }} />
      </VStack>
    </Sheet>
  )
}
