import type { FC } from 'react'
import { type GeometryReaderProps, View } from '../runtime'

export const GeometryReader: FC<GeometryReaderProps> = ({ children, ...rest }) => {
  return (
    <View {...rest}>
      {children({
        size: {
          width: 1280,
          height: 800,
        },
      })}
    </View>
  )
}
