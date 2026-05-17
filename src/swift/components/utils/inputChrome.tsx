import type { CSSProperties } from 'react'
import type { ControlSizeToken, TextFieldStyleToken, TintValue } from '../../types'
import { surfaceColors } from './surfaceColors'
import { textColorMap } from './textColorMap'
import { isForegroundToken } from './colorTokens'

const controlSizePaddingMap: Record<ControlSizeToken, CSSProperties> = {
  mini: { padding: '5px 8px', fontSize: 11, lineHeight: '16px' },
  small: { padding: '7px 10px', fontSize: 12, lineHeight: '18px' },
  regular: { padding: '10px 12px', fontSize: 15, lineHeight: '22px' },
  large: { padding: '12px 14px', fontSize: 16, lineHeight: '24px' },
}

export const inputChrome = (
  _style: TextFieldStyleToken,
  controlSize: ControlSizeToken = 'regular',
  tint?: TintValue,
): CSSProperties => {
  const tintColor = tint ? (isForegroundToken(tint as never) ? textColorMap[tint as keyof typeof textColorMap] : tint) : surfaceColors.accent
  return {
    width: '100%',
    borderRadius: 10,
    border: `1px solid ${surfaceColors.border}`,
    background: surfaceColors.inputBg,
    color: textColorMap.primary,
    accentColor: tintColor,
    boxSizing: 'border-box',
    outline: 'none',
    ...controlSizePaddingMap[controlSize],
  }
}
