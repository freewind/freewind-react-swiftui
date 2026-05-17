import type { CSSProperties, FC } from 'react'
import { viewStyle } from '../runtime'
import type { FontToken, TextAlign } from '../runtime'
import type { ViewBaseProps } from '../View'

export type TextProps = ViewBaseProps & {
  font?: FontToken
  italic?: boolean
  monospaced?: boolean
  textSelection?: 'enabled' | 'disabled'
  multilineTextAlignment?: TextAlign
}

const fontStyles: Record<FontToken, CSSProperties> = {
  largeTitle: { fontSize: 34, fontWeight: 700, lineHeight: '42px' },
  title: { fontSize: 28, fontWeight: 700, lineHeight: '36px' },
  title2: { fontSize: 22, fontWeight: 700, lineHeight: '30px' },
  title3: { fontSize: 20, fontWeight: 600, lineHeight: '28px' },
  'title3.semibold': { fontSize: 20, fontWeight: 600, lineHeight: '28px' },
  headline: { fontSize: 17, fontWeight: 600, lineHeight: '24px' },
  'headline.semibold': { fontSize: 17, fontWeight: 600, lineHeight: '24px' },
  subheadline: { fontSize: 15, fontWeight: 500, lineHeight: '22px' },
  body: { fontSize: 17, fontWeight: 400, lineHeight: '24px' },
  callout: { fontSize: 16, fontWeight: 400, lineHeight: '22px' },
  caption: { fontSize: 12, fontWeight: 400, lineHeight: '18px' },
  'caption.semibold': { fontSize: 12, fontWeight: 600, lineHeight: '18px' },
  footnote: { fontSize: 13, fontWeight: 400, lineHeight: '19px' },
  caption2: { fontSize: 11, fontWeight: 400, lineHeight: '16px' },
  'caption2.monospaced': {
    fontSize: 11,
    fontWeight: 400,
    lineHeight: '16px',
    fontFamily: '"SF Mono", Monaco, Consolas, monospace',
  },
}

const mapTextAlign = (align?: TextAlign): CSSProperties['textAlign'] => {
  if (!align) {
    return undefined
  }
  if (align === 'leading') {
    return 'left'
  }
  if (align === 'trailing') {
    return 'right'
  }
  return 'center'
}

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
