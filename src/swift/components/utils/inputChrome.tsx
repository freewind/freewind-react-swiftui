import type { CSSProperties } from 'react'
import type { TextFieldStyleToken } from '../../types'
import { surfaceColors } from './surfaceColors'
import { textColorMap } from './textColorMap'

export const inputChrome = (_style: TextFieldStyleToken): CSSProperties => {
  return {
    width: '100%',
    borderRadius: 10,
    border: `1px solid ${surfaceColors.border}`,
    background: surfaceColors.inputBg,
    color: textColorMap.primary,
    padding: '10px 12px',
    fontSize: 15,
    lineHeight: '22px',
    boxSizing: 'border-box',
    outline: 'none',
  }
}
