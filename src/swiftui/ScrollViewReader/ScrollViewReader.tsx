import type { FC } from 'react'
import { type ScrollViewReaderProps, View } from '../runtime'

export const ScrollViewReader: FC<ScrollViewReaderProps> = ({ children, ...rest }) => {
  return (
    <View {...rest}>
      {children({
        scrollTo: () => {},
      })}
    </View>
  )
}
