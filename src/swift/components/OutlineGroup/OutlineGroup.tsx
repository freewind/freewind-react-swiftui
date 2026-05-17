import type { ReactNode } from 'react'
import { DisclosureGroup } from '../runtime'
import { VStack } from '../VStack'

export type OutlineGroupProps<T> = {
  items: T[]
  id: (item: T, index: number) => string
  label: (item: T) => ReactNode
  childrenOf?: (item: T) => T[] | undefined
}

export const OutlineGroup = <T,>({ items, id, label, childrenOf }: OutlineGroupProps<T>) => {
  return (
    <VStack spacing={8} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      {items.map((item, index) => {
        const nested = childrenOf?.(item) ?? []
        return nested.length > 0 ? (
          <DisclosureGroup key={id(item, index)} title="">
            <VStack spacing={8} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
              {label(item)}
              <OutlineGroup items={nested} id={id} label={label} childrenOf={childrenOf} />
            </VStack>
          </DisclosureGroup>
        ) : (
          <div key={id(item, index)}>{label(item)}</div>
        )
      })}
    </VStack>
  )
}
