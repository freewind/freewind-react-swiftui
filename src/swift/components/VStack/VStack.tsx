import type { FC } from 'react'
import { mapStackAlignment, View } from '../runtime'
import type { ViewBaseProps } from '../View'

export type StackProps = ViewBaseProps & {
  spacing?: number
  alignment?: 'leading' | 'center' | 'trailing' | 'top' | 'bottom'
}

const inferVerticalAlignment = (alignment?: StackProps['alignment'], frameAlignment?: ViewBaseProps['frame'] extends infer T ? T extends { alignment?: infer A } ? A : never : never) => {
  if (alignment) {
    return alignment
  }

  switch (frameAlignment) {
    case 'leading':
    case 'topLeading':
    case 'bottomLeading':
      return 'leading'
    case 'trailing':
    case 'topTrailing':
    case 'bottomTrailing':
      return 'trailing'
    default:
      return 'center'
  }
}

export const VStack: FC<StackProps> = ({ spacing = 0, alignment, children, ...rest }) => {
  const resolvedAlignment = inferVerticalAlignment(alignment, rest.frame?.alignment)

  return (
    <View data-type="VStack"
      {...rest}
      stack={{
        axis: 'vertical',
        gap: spacing,
        align: mapStackAlignment('vertical', resolvedAlignment),
      }}
    >
      {children}
    </View>
  )
}
