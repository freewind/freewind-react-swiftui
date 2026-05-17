import type { FC } from 'react'
import { mapStackAlignment, View } from '../runtime'
import type { StackProps } from '../VStack'

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
