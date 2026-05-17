import type { FC } from 'react'
import { mapStackAlignment, View } from '../runtime'
import type { ViewBaseProps } from '../View'

export type StackProps = ViewBaseProps & {
  spacing?: number
  alignment?: 'leading' | 'center' | 'trailing' | 'top' | 'bottom'
}

export const VStack: FC<StackProps> = ({ spacing = 0, alignment = 'center', children, ...rest }) => {
  return (
    <View
      {...rest}
      stack={{
        axis: 'vertical',
        gap: spacing,
        align: mapStackAlignment('vertical', alignment),
      }}
    >
      {children}
    </View>
  )
}
