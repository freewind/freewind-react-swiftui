import type { FC, ReactNode } from 'react'
import { Text, type ViewBaseProps } from '../runtime'
import { VStack } from '../VStack'

export type GroupBoxProps = ViewBaseProps & {
  title?: string
  label?: ReactNode
}

export const GroupBox: FC<GroupBoxProps> = ({ title, label, children, ...rest }) => {
  return (
    <VStack
      spacing={10}
      padding={14}
      frame={{ maxWidth: 'infinity', alignment: 'leading' }}
      background={{ fill: 'ultraThinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 16 } }}
      {...rest}
    >
      {label ?? (title ? <Text font="caption.semibold">{title}</Text> : null)}
      {children}
    </VStack>
  )
}
