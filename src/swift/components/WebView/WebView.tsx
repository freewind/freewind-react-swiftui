import type { FC } from 'react'
import { type ViewBaseProps, viewStyle } from '../runtime'

export type WebViewProps = ViewBaseProps & {
  src: string
  title?: string
}

export const WebView: FC<WebViewProps> = ({ src, title = 'WebView', ...rest }) => {
  return <iframe title={title} src={src} style={{ ...viewStyle(rest), border: 0 }} />
}
