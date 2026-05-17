import type { FC, ReactNode } from 'react'
import type { Binding } from '../runtime'
import { Divider } from '../Divider'
import { HStack } from '../HStack'
import { Text } from '../Text'
import type { ViewBaseProps } from '../View'

import { VStack } from '../VStack'

export type ListProps = ViewBaseProps & {
  children: ReactNode
  selection?: Binding<string | null>
  style?: 'plain' | 'insetGrouped'
  rowSpacing?: number
}

const normalizeChildren = (children: ReactNode) => {
  if (Array.isArray(children)) {
    return children.filter(child => child !== null && child !== undefined && child !== false)
  }
  return children === null || children === undefined || children === false ? [] : [children]
}

export const List: FC<ListProps> = ({
  children,
  selection,
  style = 'plain',
  rowSpacing = 0,
  ...rest
}) => {
  const items = normalizeChildren(children)

  return (
    <VStack
      spacing={0}
      frame={{ maxWidth: 'infinity', alignment: 'leading' }}
      background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 16 } }}
      {...rest}
    >
      {selection ? (
        <HStack padding={{ horizontal: 12, vertical: 8 }}>
          <Text font="caption" foregroundStyle="secondary">
            selection: {selection.value ?? 'none'}
          </Text>
        </HStack>
      ) : null}
      {items.map((item, index) => (
        <VStack
          key={`list-item-${String(index)}`}
          spacing={rowSpacing}
          padding={style === 'insetGrouped' ? { horizontal: 12, vertical: 6 } : undefined}
          frame={{ maxWidth: 'infinity', alignment: 'leading' }}
        >
          {item}
          {index < items.length - 1 ? <Divider /> : null}
        </VStack>
      ))}
    </VStack>
  )
}
