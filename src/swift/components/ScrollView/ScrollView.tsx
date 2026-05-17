import type { CSSProperties, FC } from 'react'
import { viewStyle } from '../runtime'
import type { ViewBaseProps } from '../View'


export type ScrollViewProps = ViewBaseProps & {
  axes?: 'horizontal' | 'vertical' | Array<'horizontal' | 'vertical'>
}


export const ScrollView: FC<ScrollViewProps> = ({ axes = 'vertical', children, ...rest }) => {
  const normalized = Array.isArray(axes) ? axes : [axes]
  const style: CSSProperties = {
    ...viewStyle(rest),
    overflowX: normalized.includes('horizontal') ? 'auto' : 'hidden',
    overflowY: normalized.includes('vertical') ? 'auto' : 'hidden',
  }

  return <div style={style}>{children}</div>
}
