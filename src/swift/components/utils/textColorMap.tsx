import type { ForegroundStyleToken } from '../../types'
import { surfaceColors } from './surfaceColors'

export const textColorMap: Record<ForegroundStyleToken, string> = {
  primary: surfaceColors.primaryText,
  secondary: surfaceColors.secondaryText,
  tertiary: surfaceColors.tertiaryText,
  red: surfaceColors.red,
  blue: surfaceColors.blue,
  green: surfaceColors.green,
  accentColor: surfaceColors.accent,
}
