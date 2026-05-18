import type { FC } from 'react'
import type { ForegroundStyleToken } from '../../types'
import { View } from '../View'
import type { ViewBaseProps } from '../View'

export const Color: FC<ViewBaseProps & { tone?: ForegroundStyleToken }> = ({ tone = 'primary', ...rest }) => {
  return <View dataType="Color" background={tone} {...rest} />
}
