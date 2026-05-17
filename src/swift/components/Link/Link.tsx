import type { CSSProperties, FC } from 'react'
import { Text, textColorMap, useOpenURLAction, viewStyle } from '../runtime'
import type { ViewBaseProps } from '../View'

export type LinkProps = ViewBaseProps & {
  destination: string
  title?: string
}

export const Link: FC<LinkProps> = ({ destination, title, children, ...rest }) => {
  const openUrl = useOpenURLAction()
  const style: CSSProperties = {
    ...viewStyle(rest),
    color: textColorMap.accentColor,
    textDecoration: 'none',
  }

  return (
    <a
      href={destination}
      target="_blank"
      rel="noreferrer"
      style={style}
      onClick={event => {
        event.preventDefault()
        void openUrl.callAsFunction(destination)
      }}
    >
      {children ?? <Text foregroundStyle="accentColor">{title ?? destination}</Text>}
    </a>
  )
}
