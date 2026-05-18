import type { FC } from 'react'
import { HStack } from '../runtime'
import type { StackProps } from '../VStack'

export const ControlGroup: FC<StackProps> = ({ spacing = 8, children, ...rest }) => {
  return (
    <HStack data-type="ControlGroup"
      spacing={spacing}
      padding={6}
      background={{ fill: 'tertiary', in: { kind: 'roundedRectangle', cornerRadius: 14 } }}
      {...rest}
    >
      {children}
    </HStack>
  )
}
