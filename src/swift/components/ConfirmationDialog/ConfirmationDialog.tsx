import type { FC } from 'react'
import { Button } from '../Button'
import { Sheet, Text, type Binding } from '../runtime'
import { VStack } from '../VStack'

export type ConfirmationDialogProps = {
  isPresented: Binding<boolean>
  title: string
  actions: Array<{ title: string; role?: 'default' | 'destructive'; onPress?: () => void }>
}

export const ConfirmationDialog: FC<ConfirmationDialogProps> = ({ isPresented, title, actions }) => {
  return (
    <Sheet isPresented={isPresented}>
      <VStack
        spacing={8}
        padding={14}
        frame={{ width: 320, maxWidth: 'infinity' }}
        background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 20 } }}
      >
        <Text font="headline.semibold">{title}</Text>
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
      </VStack>
    </Sheet>
  )
}
