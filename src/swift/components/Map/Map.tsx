import type { FC } from 'react'
import { Text, type ViewBaseProps } from '../runtime'
import { VStack } from '../VStack'

export type MapProps = ViewBaseProps & {
  latitude?: number
  longitude?: number
  title?: string
}

export const Map: FC<MapProps> = ({ latitude = 31.2304, longitude = 121.4737, title = 'Map', ...rest }) => {
  return (
    <VStack
      spacing={8}
      padding={12}
      background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 16 } }}
      {...rest}
    >
      <Text font="caption.semibold">{title}</Text>
      <iframe
        title={title}
        src={`https://www.openstreetmap.org/export/embed.html?bbox=${longitude - 0.02}%2C${latitude - 0.02}%2C${longitude + 0.02}%2C${latitude + 0.02}&layer=mapnik&marker=${latitude}%2C${longitude}`}
        style={{ width: '100%', height: 220, border: 0, borderRadius: 12 }}
      />
    </VStack>
  )
}
