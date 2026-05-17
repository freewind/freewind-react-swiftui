import { type FC, useMemo, useState } from 'react'
import { Button } from '../Button'
import { HStack } from '../HStack'
import { Spacer } from '../Spacer'
import { Text, type ViewBaseProps } from '../runtime'
import { VStack } from '../VStack'

export type MapProps = ViewBaseProps & {
  latitude?: number
  longitude?: number
  title?: string
  annotationTitle?: string
  showsScale?: boolean
  showsCompass?: boolean
}

export const Map: FC<MapProps> = ({
  latitude = 31.2304,
  longitude = 121.4737,
  title = 'Map',
  annotationTitle,
  showsScale = true,
  showsCompass = true,
  ...rest
}) => {
  const [span, setSpan] = useState(0.02)
  const [isLoading, setIsLoading] = useState(true)
  const embedSrc = useMemo(
    () =>
      `https://www.openstreetmap.org/export/embed.html?bbox=${longitude - span}%2C${latitude - span}%2C${longitude + span}%2C${latitude + span}&layer=mapnik&marker=${latitude}%2C${longitude}`,
    [latitude, longitude, span],
  )

  return (
    <VStack
      spacing={0}
      background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 16 } }}
      clipShape={{ kind: 'roundedRectangle', cornerRadius: 16 }}
      {...rest}
    >
      <HStack
        spacing={10}
        padding={{ horizontal: 12, vertical: 10 }}
        frame={{ maxWidth: 'infinity', alignment: 'leading' }}
        background={{ fill: 'ultraThinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 0 } }}
      >
        <VStack spacing={0} alignment="leading">
          <Text font="caption.semibold">{title}</Text>
          <Text font="caption2.monospaced" foregroundStyle="secondary">
            {`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`}
          </Text>
        </VStack>
        <Spacer />
        <Button title="−" buttonStyle="bordered" controlSize="small" onPress={() => {
          setIsLoading(true)
          setSpan(prev => Math.min(0.12, prev * 1.6))
        }} />
        <Button title="+" buttonStyle="bordered" controlSize="small" onPress={() => {
          setIsLoading(true)
          setSpan(prev => Math.max(0.0025, prev / 1.6))
        }} />
      </HStack>
      <div style={{ position: 'relative', width: '100%', height: 260, overflow: 'hidden' }}>
        <iframe
          title={title}
          src={embedSrc}
          onLoad={() => setIsLoading(false)}
          style={{ width: '100%', height: '100%', border: 0 }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ transform: 'translateY(-16px)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <div
              style={{
                padding: '6px 10px',
                borderRadius: 999,
                background: 'rgba(255,255,255,0.92)',
                boxShadow: '0 10px 24px rgba(15, 23, 42, 0.18)',
                fontSize: 11,
                fontWeight: 600,
              }}
            >
              {annotationTitle ?? title}
            </div>
            <div
              style={{
                width: 18,
                height: 18,
                borderRadius: 999,
                background: '#ff453a',
                border: '3px solid #fff',
                boxShadow: '0 8px 20px rgba(15, 23, 42, 0.25)',
              }}
            />
          </div>
        </div>
        {showsCompass ? (
          <div
            style={{
              position: 'absolute',
              top: 12,
              right: 12,
              width: 36,
              height: 36,
              borderRadius: 999,
              background: 'rgba(255,255,255,0.92)',
              boxShadow: '0 8px 20px rgba(15, 23, 42, 0.14)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            N
          </div>
        ) : null}
        {isLoading ? (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(255,255,255,0.42)',
              backdropFilter: 'blur(4px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            Loading map…
          </div>
        ) : null}
      </div>
      <HStack
        spacing={8}
        padding={{ horizontal: 12, vertical: 8 }}
        frame={{ maxWidth: 'infinity', alignment: 'leading' }}
        background={{ fill: 'tertiary', in: { kind: 'roundedRectangle', cornerRadius: 0 } }}
      >
        <Text font="caption" foregroundStyle="secondary">
          span {span.toFixed(4)}
        </Text>
        <Spacer />
        {showsScale ? (
          <Text font="caption2.monospaced" foregroundStyle="secondary">
            {span < 0.01 ? '200 m' : span < 0.03 ? '1 km' : '5 km'}
          </Text>
        ) : null}
      </HStack>
    </VStack>
  )
}
