import type { CSSProperties, FC } from 'react'
import { viewStyle } from '../runtime'
import type { ViewBaseProps } from '../View'

import { Text } from '../Text'

export type ImageProps = ViewBaseProps & {
  systemName?: string
  src?: string
  alt?: string
  resizable?: boolean
  scaledToFit?: boolean
}

const symbolMap: Record<string, string> = {
  xmark: '×',
  iphone: 'iPhone',
  laptopcomputer: 'Mac',
  'pin.fill': '●',
  photo: '▣',
  doc: '▤',
}

export const Image: FC<ImageProps> = ({
  systemName,
  src,
  alt = '',
  scaledToFit,
  resizable,
  children,
  ...rest
}) => {
  const style: CSSProperties = {
    ...viewStyle(rest),
    objectFit: scaledToFit || resizable ? 'contain' : undefined,
    display: 'block',
  }

  if (src) {
    return <img src={src} alt={alt} style={style} />
  }

  return (
    <Text
      {...rest}
      font="caption"
      padding={{ horizontal: 8, vertical: 4 }}
      background={{ fill: 'tertiary', in: { kind: 'capsule' } }}
    >
      {children ?? symbolMap[systemName ?? ''] ?? systemName ?? 'image'}
    </Text>
  )
}
