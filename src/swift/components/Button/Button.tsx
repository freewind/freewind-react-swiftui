import type { CSSProperties, FC } from 'react'
import type { ControlSizeToken } from '../../types'
import { useContext } from 'react'
import { disabledContext, surfaceColors, textColorMap, viewStyle } from '../runtime'
import type { ViewBaseProps } from '../View'

export type ButtonStyleToken = 'plain' | 'bordered' | 'borderedProminent' | 'borderless' | 'link'
export type { ControlSizeToken } from '../../types'

type ButtonProps = ViewBaseProps & {
  title?: string
  onPress?: () => void
  buttonStyle?: ButtonStyleToken
  controlSize?: ControlSizeToken
}

const buttonChrome = (
  buttonStyle: ButtonStyleToken,
  controlSize: ControlSizeToken,
  disabled: boolean,
): CSSProperties => {
  const sizes: Record<ControlSizeToken, CSSProperties> = {
    mini: { padding: '3px 8px', fontSize: 11, lineHeight: '16px' },
    small: { padding: '5px 10px', fontSize: 12, lineHeight: '18px' },
    regular: { padding: '7px 12px', fontSize: 13, lineHeight: '20px' },
    large: { padding: '9px 14px', fontSize: 15, lineHeight: '22px' },
  }

  const common: CSSProperties = {
    borderRadius: 10,
    border: '1px solid transparent',
    background: 'transparent',
    color: textColorMap.primary,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    cursor: disabled ? 'default' : 'pointer',
    transition: 'all 120ms ease-out',
    ...sizes[controlSize],
  }

  switch (buttonStyle) {
    case 'bordered':
      return { ...common, borderColor: surfaceColors.border, background: surfaceColors.panelBg }
    case 'borderedProminent':
      return { ...common, background: 'currentColor', color: '#fff' }
    case 'borderless':
      return { ...common, padding: 0 }
    case 'link':
      return { ...common, color: surfaceColors.accent, padding: 0, border: 'none', background: 'transparent' }
    case 'plain':
    default:
      return common
  }
}

export const Button: FC<ButtonProps> = ({
  title,
  children,
  onPress,
  buttonStyle = 'plain',
  controlSize = 'regular',
  ...rest
}) => {
  const disabled = useContext(disabledContext) || Boolean(rest.disabled)
  const tintColor =
    typeof rest.tint === 'string' && rest.tint.startsWith('#')
      ? rest.tint
      : rest.tint === 'red' || rest.tint === 'blue' || rest.tint === 'green' || rest.tint === 'accentColor'
        ? textColorMap[rest.tint]
        : surfaceColors.accent
  const style = {
    ...buttonChrome(buttonStyle, controlSize, disabled),
    ...viewStyle(rest),
    ...(buttonStyle === 'borderedProminent' ? { background: tintColor } : null),
    ...(buttonStyle === 'link' ? { color: tintColor } : null),
  }

  return (
    <button data-type="Button" type="button" style={style} onClick={onPress} disabled={disabled}>
      {children ?? title}
    </button>
  )
}
