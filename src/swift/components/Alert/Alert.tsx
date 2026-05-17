import type { FC, ReactNode } from 'react'
import { Button } from '../Button'
import { HStack } from '../HStack'
import { Sheet, Spacer, Text, type Binding } from '../runtime'
import { VStack } from '../VStack'

export type AlertProps = {
  isPresented: Binding<boolean>
  title: string
  message?: ReactNode
  dismissTitle?: string
}

export const Alert: FC<AlertProps> = ({ isPresented, title, message, dismissTitle = '确定' }) => {
  return (
    <Sheet isPresented={isPresented}>
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
          <Button title={dismissTitle} buttonStyle="borderedProminent" onPress={() => isPresented.setValue(false)} />
        </HStack>
      </VStack>
    </Sheet>
  )
}
