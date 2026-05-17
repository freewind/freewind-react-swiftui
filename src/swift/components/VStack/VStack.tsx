import type { FC } from 'react'
import { mapStackAlignment, type StackProps, View } from '../runtime'

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
