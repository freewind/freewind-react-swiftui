import type { FC } from 'react'
import { Link } from '../Link/Link'
import type { LinkProps } from '../Link/Link'

export const HelpLink: FC<LinkProps> = props => {
  return <Link data-type="HelpLink" title={props.title ?? '帮助'} {...props} />
}
