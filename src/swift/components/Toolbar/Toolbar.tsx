import type { FC } from 'react'
import { HStack, type StackProps } from '../runtime'

export const Toolbar: FC<StackProps> = ({ spacing = 10, children, ...rest }) => {
  return (
    <HStack
      spacing={spacing}
      padding={{ horizontal: 12, vertical: 10 }}
      frame={{ maxWidth: 'infinity', alignment: 'leading' }}
      background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 14 } }}
      {...rest}
    >
      {children}
    </HStack>
  )
}
