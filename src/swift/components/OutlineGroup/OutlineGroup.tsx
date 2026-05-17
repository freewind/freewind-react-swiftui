import type { ReactNode } from 'react'
import type { Binding, ViewBaseProps } from '../runtime'
import { DisclosureGroup } from '../runtime'
import { View } from '../View'
import { VStack } from '../VStack'

export type OutlineGroupProps<T> = ViewBaseProps & {
  items: T[]
  id: (item: T, index: number) => string
  label: (item: T) => ReactNode
  childrenOf?: (item: T) => T[] | undefined
  expandedIds?: Binding<string[]>
  contentPadding?: number
}

export const OutlineGroup = <T,>({
  items,
  id,
  label,
  childrenOf,
  expandedIds,
  contentPadding = 10,
  ...rest
}: OutlineGroupProps<T>) => {
  return (
    <VStack spacing={8} frame={{ maxWidth: 'infinity', alignment: 'leading' }} {...rest}>
      {items.map((item, index) => {
        const itemId = id(item, index)
        const nested = childrenOf?.(item) ?? []
        const expanded = expandedIds?.value.includes(itemId) ?? false
        const expandedBinding = expandedIds
          ? {
              value: expanded,
              setValue: (next: boolean) => {
                expandedIds.setValue(next ? [...expandedIds.value, itemId] : expandedIds.value.filter(value => value !== itemId))
              },
            }
          : undefined
        return nested.length > 0 ? (
          <DisclosureGroup key={itemId} title="" isExpanded={expandedBinding}>
            <VStack spacing={8} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
              {label(item)}
              <OutlineGroup
                items={nested}
                id={id}
                label={label}
                childrenOf={childrenOf}
                expandedIds={expandedIds}
                contentPadding={contentPadding}
              />
            </VStack>
          </DisclosureGroup>
        ) : (
          <View key={itemId} padding={{ leading: contentPadding }}>
            {label(item)}
          </View>
        )
      })}
    </VStack>
  )
}
