import type { FC, ReactNode } from 'react'
import { View } from '../runtime'
import type { ViewBaseProps } from '../View'
import type { Binding, ScrollPosition, ScrollTarget } from '../../types'


export type ScrollViewReaderProps = Omit<ViewBaseProps, 'children'> & {
  position?: Binding<ScrollPosition>
  children: (proxy: {
    scrollTo: (id: string, options?: { anchor?: ScrollTarget['anchor'] }) => void
  }) => ReactNode
}


export const ScrollViewReader: FC<ScrollViewReaderProps> = ({ children, position, ...rest }) => {
  return (
    <View dataType="ScrollViewReader" {...rest}>
      {children({
        scrollTo: (id, options) => {
          position?.setValue({
            targetId: id,
            y: 0,
            x: 0,
          })
        },
      })}
    </View>
  )
}
