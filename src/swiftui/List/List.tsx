import type { FC } from 'react'
import { Divider } from '../Divider'
import { type ListProps, normalizeChildren } from '../runtime'
import { VStack } from '../VStack'

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
