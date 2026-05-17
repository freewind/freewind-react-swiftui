import type { CSSProperties, FC } from 'react'
import { type ScrollViewProps, viewStyle } from '../runtime'

export const ScrollView: FC<ScrollViewProps> = ({ axes = 'vertical', children, ...rest }) => {
  const normalized = Array.isArray(axes) ? axes : [axes]
  const style: CSSProperties = {
    ...viewStyle(rest),
    overflowX: normalized.includes('horizontal') ? 'auto' : 'hidden',
    overflowY: normalized.includes('vertical') ? 'auto' : 'hidden',
  }

  return <div style={style}>{children}</div>
}
