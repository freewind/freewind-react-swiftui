import type { FC } from 'react'
import { surfaceColors } from '../runtime'

export type DividerProps = {
  axis?: 'horizontal' | 'vertical'
}


export const Divider: FC<DividerProps> = ({ axis = 'horizontal' }) => {
  return (
    <div data-type="Divider"
      style={
        axis === 'horizontal'
          ? { height: 1, width: '100%', background: surfaceColors.border, flexShrink: 0 }
          : { width: 1, alignSelf: 'stretch', background: surfaceColors.border, flexShrink: 0 }
      }
    />
  )
}
