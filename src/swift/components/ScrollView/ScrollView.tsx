import { type CSSProperties, type FC, useContext } from 'react'
import { parentStackAxisContext, viewStyle } from '../runtime'
import type { ViewBaseProps } from '../View'


export type ScrollViewProps = ViewBaseProps & {
  axes?: 'horizontal' | 'vertical' | Array<'horizontal' | 'vertical'>
  showsIndicators?: boolean
}


export const ScrollView: FC<ScrollViewProps> = ({ axes = 'vertical', showsIndicators = true, children, ...rest }) => {
  const parentStackAxis = useContext(parentStackAxisContext)
  const normalized = Array.isArray(axes) ? axes : [axes]
  const style: CSSProperties = {
    ...viewStyle(rest, parentStackAxis),
    overflowX: normalized.includes('horizontal') ? (showsIndicators ? 'scroll' : 'auto') : 'hidden',
    overflowY: normalized.includes('vertical') ? (showsIndicators ? 'scroll' : 'auto') : 'hidden',
  }

  return <div data-type="ScrollView" style={style}>{children}</div>
}
