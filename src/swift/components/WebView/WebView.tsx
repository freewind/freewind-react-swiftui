import { type FC, useMemo, useState } from 'react'
import { Button } from '../Button'
import { HStack } from '../HStack'
import { Spacer } from '../Spacer'
import { Text } from '../Text'
import { VStack } from '../VStack'
import { inputChrome, surfaceColors, textColorMap, viewStyle } from '../runtime'
import type { ViewBaseProps } from '../View'

export type WebViewProps = ViewBaseProps & {
  src: string
  title?: string
  showsNavigationChrome?: boolean
}

export const WebView: FC<WebViewProps> = ({ src, title = 'WebView', showsNavigationChrome = true, ...rest }) => {
  const [history, setHistory] = useState([src])
  const [historyIndex, setHistoryIndex] = useState(0)
  const [draftSrc, setDraftSrc] = useState(src)
  const [reloadToken, setReloadToken] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const currentSrc = history[historyIndex] ?? src
  const hostLabel = useMemo(() => {
    try {
      return new URL(currentSrc).host
    } catch {
      return currentSrc
    }
  }, [currentSrc])

  const navigate = (nextSrc: string) => {
    setIsLoading(true)
    setHistory(prev => [...prev.slice(0, historyIndex + 1), nextSrc])
    setHistoryIndex(prev => prev + 1)
    setDraftSrc(nextSrc)
  }

  const frame = (
    <iframe
      key={`${currentSrc}-${String(reloadToken)}`}
      title={title}
      src={currentSrc}
      onLoad={() => setIsLoading(false)}
      style={{ width: '100%', height: '100%', border: 0, background: '#fff' }}
    />
  )

  return (
    <VStack data-type="WebView"
      spacing={0}
      frame={rest.frame}
      background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 16 } }}
      clipShape={{ kind: 'roundedRectangle', cornerRadius: 16 }}
    >
      {showsNavigationChrome ? (
        <VStack spacing={0}>
          <HStack
            spacing={8}
            padding={{ horizontal: 10, vertical: 8 }}
            background={{ fill: 'ultraThinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 0 } }}
            frame={{ maxWidth: 'infinity', alignment: 'leading' }}
          >
            <Button title="‹" buttonStyle="borderless" disabled={historyIndex === 0} onPress={() => {
              setIsLoading(true)
              setHistoryIndex(prev => Math.max(0, prev - 1))
            }} />
            <Button
              title="›"
              buttonStyle="borderless"
              disabled={historyIndex >= history.length - 1}
              onPress={() => {
                setIsLoading(true)
                setHistoryIndex(prev => Math.min(history.length - 1, prev + 1))
              }}
            />
            <Button title="↻" buttonStyle="borderless" onPress={() => {
              setIsLoading(true)
              setReloadToken(prev => prev + 1)
            }} />
            <input
              value={draftSrc}
              onChange={event => setDraftSrc(event.target.value)}
              onKeyDown={event => {
                if (event.key === 'Enter') {
                  navigate(draftSrc)
                }
              }}
              style={{
                ...inputChrome('roundedBorder'),
                width: '100%',
                flex: 1,
                padding: '7px 10px',
                fontSize: 12,
                lineHeight: '18px',
              }}
            />
            <Button
              title="Open"
              buttonStyle="bordered"
              controlSize="small"
              onPress={() => window.open(currentSrc, '_blank', 'noopener,noreferrer')}
            />
          </HStack>
          <HStack
            spacing={8}
            padding={{ horizontal: 12, vertical: 6 }}
            frame={{ maxWidth: 'infinity', alignment: 'leading' }}
            background={{ fill: 'tertiary', in: { kind: 'roundedRectangle', cornerRadius: 0 } }}
          >
            <Text font="caption.semibold">{title}</Text>
            <Text font="caption2.monospaced" foregroundStyle="secondary">
              {hostLabel}
            </Text>
            <Spacer />
            <Text font="caption" foregroundStyle={isLoading ? 'accentColor' : 'secondary'}>
              {isLoading ? 'Loading…' : 'Loaded'}
            </Text>
          </HStack>
          <div
            style={{
              height: 2,
              width: '100%',
              background: surfaceColors.tertiaryFill,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: isLoading ? '56%' : '100%',
                height: '100%',
                background: textColorMap.accentColor,
                transition: 'width 220ms ease-out',
              }}
            />
          </div>
        </VStack>
      ) : null}
      <div
        style={{
          ...viewStyle({ ...rest, frame: undefined }),
          width: '100%',
          minHeight: 220,
          flex: 1,
          position: 'relative',
          background: surfaceColors.panelBg,
        }}
      >
        {frame}
      </div>
    </VStack>
  )
}
