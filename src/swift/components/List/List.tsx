import type { FC, ReactNode } from 'react'
import { Divider } from '../Divider'
import type { ViewBaseProps } from '../View'

import { VStack } from '../VStack'

export type ListProps = ViewBaseProps & {
  children: ReactNode
}

const normalizeChildren = (children: ReactNode) => {
  if (Array.isArray(children)) {
    return children.filter(child => child !== null && child !== undefined && child !== false)
  }
  return children === null || children === undefined || children === false ? [] : [children]
}

export const List: FC<ListProps> = ({ children, ...rest }) => {
  const items = normalizeChildren(children)

  return (
    <VStack
      spacing={0}
      frame={{ maxWidth: 'infinity', alignment: 'leading' }}
      background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 16 } }}
      {...rest}
    >
      {items.map((item, index) => (
        <VStack key={`list-item-${String(index)}`} spacing={0} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
          {item}
          {index < items.length - 1 ? <Divider /> : null}
        </VStack>
      ))}
    </VStack>
  )
}
