import type { FC } from 'react'
import { Button } from '../Button'
import type { ViewBaseProps } from '../View'


export type ShareLinkProps = ViewBaseProps & {
  title?: string
  text?: string
  url?: string
}

export const ShareLink: FC<ShareLinkProps> = ({ title = '分享', text, url, ...rest }) => {
  return (
    <Button
      title={title}
      buttonStyle="bordered"
      onPress={async () => {
        const shareText = [text, url].filter(Boolean).join('\n')
        if (navigator.share) {
          await navigator.share({ text, url }).catch(() => undefined)
          return
        }
        await navigator.clipboard.writeText(shareText).catch(() => undefined)
      }}
      {...rest}
    />
  )
}
