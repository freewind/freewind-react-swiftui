import type { FC } from 'react'
import { HStack, type StackProps } from '../runtime'

export const ControlGroup: FC<StackProps> = ({ spacing = 8, children, ...rest }) => {
  return (
    <HStack
      spacing={spacing}
      padding={6}
      background={{ fill: 'tertiary', in: { kind: 'roundedRectangle', cornerRadius: 14 } }}
      {...rest}
    >
      {children}
    </HStack>
  )
}
