import type { FC } from 'react'
import { mapStackAlignment, View } from '../runtime'
import type { StackProps } from '../VStack'

const inferHorizontalAlignment = (alignment?: StackProps['alignment'], frameAlignment?: StackProps['frame'] extends infer T ? T extends { alignment?: infer A } ? A : never : never) => {
  if (alignment) {
    return alignment
  }

  switch (frameAlignment) {
    case 'top':
    case 'topLeading':
    case 'topTrailing':
      return 'top'
    case 'bottom':
    case 'bottomLeading':
    case 'bottomTrailing':
      return 'bottom'
    default:
      return 'center'
  }
}

export const HStack: FC<StackProps> = ({ spacing = 0, alignment, children, ...rest }) => {
  const resolvedAlignment = inferHorizontalAlignment(alignment, rest.frame?.alignment)

  return (
    <View data-type="HStack"
      {...rest}
      stack={{
        axis: 'horizontal',
        gap: spacing,
        align: mapStackAlignment('horizontal', resolvedAlignment),
      }}
    >
      {children}
    </View>
  )
}
