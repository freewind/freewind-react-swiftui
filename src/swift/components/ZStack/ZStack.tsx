import type { FC } from 'react'
import { mapFrameAlignment } from '../runtime'
import { View } from '../View'
import type { StackProps } from '../VStack'

export const ZStack: FC<StackProps> = ({ alignment = 'center', children, ...rest }) => {
  return (
    <View data-type="ZStack"
      {...rest}
      stack={{
        axis: 'z',
        align: mapFrameAlignment(alignment === 'center' ? 'center' : 'leading'),
      }}
    >
      {children}
    </View>
  )
}