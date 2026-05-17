import type { FC } from 'react'
import { useContext } from 'react'
import { buttonChrome, disabledContext, type ButtonStyleToken, type ControlSizeToken, viewStyle, type ViewBaseProps } from '../runtime'

type ButtonProps = ViewBaseProps & {
  title?: string
  onPress?: () => void
  buttonStyle?: ButtonStyleToken
  controlSize?: ControlSizeToken
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
  const style = {
    ...buttonChrome(buttonStyle, controlSize, disabled),
    ...viewStyle(rest),
  }

  return (
    <button type="button" style={style} onClick={onPress} disabled={disabled}>
      {children ?? title}
    </button>
  )
}
