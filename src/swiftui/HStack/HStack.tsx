import type { FC } from 'react'
import { mapStackAlignment, type StackProps, View } from '../runtime'

export const HStack: FC<StackProps> = ({ spacing = 0, alignment = 'center', children, ...rest }) => {
  return (
    <View
      {...rest}
      stack={{
        axis: 'horizontal',
        gap: spacing,
        align: mapStackAlignment('horizontal', alignment),
      }}
    >
      {children}
    </View>
  )
}
