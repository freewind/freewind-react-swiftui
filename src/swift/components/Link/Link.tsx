import type { CSSProperties, FC } from 'react'
import { Text, textColorMap, type ViewBaseProps, viewStyle } from '../runtime'

export type LinkProps = ViewBaseProps & {
  destination: string
  title?: string
}

export const Link: FC<LinkProps> = ({ destination, title, children, ...rest }) => {
  const style: CSSProperties = {
    ...viewStyle(rest),
    color: textColorMap.accentColor,
    textDecoration: 'none',
  }

  return (
    <a href={destination} target="_blank" rel="noreferrer" style={style}>
      {children ?? <Text foregroundStyle="accentColor">{title ?? destination}</Text>}
    </a>
  )
}
