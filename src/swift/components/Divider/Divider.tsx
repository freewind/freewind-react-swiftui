import type { FC } from 'react'
import { type DividerProps, surfaceColors } from '../runtime'

export const Divider: FC<DividerProps> = ({ axis = 'horizontal' }) => {
  return (
    <div
      style={
        axis === 'horizontal'
          ? { height: 1, width: '100%', background: surfaceColors.border, flexShrink: 0 }
          : { width: 1, alignSelf: 'stretch', background: surfaceColors.border, flexShrink: 0 }
      }
    />
  )
}
