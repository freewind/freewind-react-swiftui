import type { FC, ReactNode } from 'react'
import { Button } from '../Button'
import { HStack } from '../HStack'
import { Sheet, Spacer, Text, type Binding } from '../runtime'
import { VStack } from '../VStack'

type AlertAction = {
  title: string
  role?: 'default' | 'cancel' | 'destructive'
  onPress?: () => void
}

export type AlertProps = {
  isPresented: Binding<boolean>
  title: string
  message?: ReactNode
  dismissTitle?: string
  primaryButton?: AlertAction
  secondaryButton?: AlertAction
}

export const Alert: FC<AlertProps> = ({
  isPresented,
  title,
  message,
  dismissTitle = '确定',
  primaryButton,
  secondaryButton,
}) => {
  const fallbackAction: AlertAction = { title: dismissTitle }
  const actions = [secondaryButton, primaryButton ?? fallbackAction].filter(Boolean) as AlertAction[]

  return (
    <Sheet data-type="Alert" isPresented={isPresented} title="Alert" detents={['medium']}>
      <VStack
        spacing={12}
        padding={18}
        frame={{ width: 320, maxWidth: 'infinity' }}
        background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 20 } }}
      >
        <Text font="headline.semibold">{title}</Text>
        {typeof message === 'string' ? <Text foregroundStyle="secondary">{message}</Text> : message}
        <HStack>
          <Spacer />
          {actions.map(action => (
            <Button
              key={action.title}
              title={action.title}
              buttonStyle={action.role === 'destructive' || action === primaryButton ? 'borderedProminent' : 'bordered'}
              tint={action.role === 'destructive' ? 'red' : undefined}
              onPress={() => {
                isPresented.setValue(false)
                action.onPress?.()
              }}
            />
          ))}
        </HStack>
      </VStack>
    </Sheet>
  )
}
