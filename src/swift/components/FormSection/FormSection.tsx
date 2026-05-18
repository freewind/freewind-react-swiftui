import type { FC, ReactNode } from 'react'
import { VStack } from '../VStack'
import { Text } from '../Text'

export const FormSection: FC<{
  title: string
  children: ReactNode
}> = ({ title, children }) => {
  return (
    <VStack dataType="FormSection"
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
