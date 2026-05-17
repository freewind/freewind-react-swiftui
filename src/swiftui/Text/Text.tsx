import type { CSSProperties, FC } from 'react'
import { fontStyles, mapTextAlign, type TextProps, viewStyle } from '../runtime'

export const Text: FC<TextProps> = ({
  children,
  font = 'body',
  italic,
  monospaced,
  textSelection,
  multilineTextAlignment,
  ...rest
}) => {
  const style: CSSProperties = {
    ...viewStyle(rest),
    ...fontStyles[font],
    fontStyle: italic ? 'italic' : undefined,
    fontFamily: monospaced ? '"SF Mono", Monaco, Consolas, monospace' : fontStyles[font].fontFamily,
    userSelect: textSelection === 'enabled' ? 'text' : undefined,
    textAlign: mapTextAlign(multilineTextAlignment),
  }

  return <div style={style}>{children}</div>
}
