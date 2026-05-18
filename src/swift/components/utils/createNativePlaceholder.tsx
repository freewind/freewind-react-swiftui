import type { FC, PropsWithChildren } from 'react'
import { Text } from '../runtime'
import { VStack } from '../VStack'
import type { ViewBaseProps } from '../View'

export type NativePlaceholderProps = ViewBaseProps &
  PropsWithChildren<{
    note?: string
  }>

export const createNativePlaceholder = (name: string, note: string): FC<NativePlaceholderProps> => {
  const NativePlaceholder: FC<NativePlaceholderProps> = ({ children, ...rest }) => {
    return (
      <VStack
        dataType={name}
        spacing={8}
        padding={12}
        frame={{ maxWidth: 'infinity', alignment: 'leading' }}
        background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 14 } }}
        {...rest}
      >
        <Text font="caption.semibold">{name}</Text>
        <Text font="caption" foregroundStyle="secondary">
          {note}
        </Text>
        {children}
      </VStack>
    )
  }

  NativePlaceholder.displayName = name
  return NativePlaceholder
}
