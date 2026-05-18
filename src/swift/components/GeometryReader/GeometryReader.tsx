import type { FC, ReactNode } from 'react'
import { View } from '../runtime'
import type { ViewBaseProps } from '../View'


export type GeometryProxy = {
  size: {
    width: number
    height: number
  }
}

export type GeometryReaderProps = Omit<ViewBaseProps, 'children'> & {
  children: (proxy: GeometryProxy) => ReactNode
}


export const GeometryReader: FC<GeometryReaderProps> = ({ children, ...rest }) => {
  return (
    <View data-type="GeometryReader" {...rest}>
      {children({
        size: {
          width: 1280,
          height: 800,
        },
      })}
    </View>
  )
}
