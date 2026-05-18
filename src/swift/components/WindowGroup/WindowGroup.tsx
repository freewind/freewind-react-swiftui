import { useEffect, type CSSProperties, type FC, type PropsWithChildren } from 'react'
import { ScrollView } from '../ScrollView'
import { surfaceColors, textColorMap, useWindowRegistration } from '../runtime'
import type { ThemeMode } from '../runtime'
import type { Axis } from '../../types'

export type WindowStyleProps = {
  id?: string
  minWidth?: number
  minHeight?: number
  defaultWidth?: number
  defaultHeight?: number
  theme?: ThemeMode
  title?: string
  subtitle?: string
  contentScrollAxes?: Axis | Axis[]
  contentShowsIndicators?: boolean
}

const themePalettes: Record<ThemeMode, Record<string, string>> = {
  light: {
    '--swui-app-bg': '#f3f3f5',
    '--swui-panel-bg': '#ffffff',
    '--swui-border': 'rgba(60, 60, 67, 0.16)',
    '--swui-primary-text': '#111111',
    '--swui-secondary-text': '#6e6e73',
    '--swui-tertiary-text': '#8e8e93',
    '--swui-accent': '#0a84ff',
    '--swui-red': '#ff3b30',
    '--swui-green': '#34c759',
    '--swui-blue': '#0a84ff',
    '--swui-material': 'rgba(255, 255, 255, 0.78)',
    '--swui-ultra-thin-material': 'rgba(255, 255, 255, 0.58)',
    '--swui-tertiary-fill': 'rgba(118, 118, 128, 0.12)',
    '--swui-input-bg': '#ffffff',
  },
  dark: {
    '--swui-app-bg': '#161618',
    '--swui-panel-bg': '#1f1f22',
    '--swui-border': 'rgba(84, 84, 88, 0.65)',
    '--swui-primary-text': '#f5f5f7',
    '--swui-secondary-text': '#a1a1aa',
    '--swui-tertiary-text': '#8e8e93',
    '--swui-accent': '#0a84ff',
    '--swui-red': '#ff453a',
    '--swui-green': '#32d74b',
    '--swui-blue': '#64d2ff',
    '--swui-material': 'rgba(44, 44, 46, 0.74)',
    '--swui-ultra-thin-material': 'rgba(58, 58, 60, 0.52)',
    '--swui-tertiary-fill': 'rgba(118, 118, 128, 0.24)',
    '--swui-input-bg': '#2c2c2e',
  },
}


export const WindowGroup: FC<PropsWithChildren<WindowStyleProps>> = ({
                                                                       id,
                                                                       children,
                                                                       minWidth,
                                                                       minHeight,
                                                                       defaultWidth,
                                                                       defaultHeight,
                                                                     theme = 'light',
                                                                       title = 'SwiftUI Preview',
                                                                       subtitle,
                                                                       contentScrollAxes,
                                                                       contentShowsIndicators = true,
                                                                     }) => {
  const vars = themePalettes[theme] as CSSProperties
  const resolvedWidth = Math.max(defaultWidth ?? minWidth ?? 980, 360)
  const resolvedHeight = Math.max(defaultHeight ?? minHeight ?? 720, 240)
  const windowRegistration = useWindowRegistration({
    id: id ?? title,
    title,
    isKeyWindow: true,
    defaultWidth,
    defaultHeight,
  })
  const { register, focus } = windowRegistration

  useEffect(() => {
    register()
    focus()
  }, [register, focus, id, title, defaultWidth, defaultHeight])

  return (
    <div
      style={{
        ...vars,
        minWidth,
        minHeight,
        width: '100vw',
        height: '100vh',
        background: surfaceColors.appBg,
        color: textColorMap.primary,
        fontFamily:
          '"SF Pro Text", "SF Pro Display", ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'center',
        padding: 16,
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          width: `min(calc(100vw - 32px), ${String(resolvedWidth)}px)`,
          height: `min(calc(100vh - 32px), ${String(resolvedHeight)}px)`,
          maxWidth: '100%',
          maxHeight: '100%',
          borderRadius: 18,
          overflow: 'hidden',
          border: `1px solid ${surfaceColors.border}`,
          background: surfaceColors.panelBg,
          boxShadow:
            theme === 'dark'
              ? '0 20px 60px rgba(0, 0, 0, 0.45)'
              : '0 24px 70px rgba(15, 23, 42, 0.16)',
          display: 'grid',
          gridTemplateRows: '44px minmax(0, 1fr)',
          backdropFilter: 'blur(24px)',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '96px minmax(0, 1fr) 96px',
            alignItems: 'center',
            gap: 8,
            padding: '0 14px',
            borderBottom: `1px solid ${surfaceColors.border}`,
            background:
              theme === 'dark'
                ? 'linear-gradient(180deg, rgba(58,58,60,0.94), rgba(44,44,46,0.92))'
                : 'linear-gradient(180deg, rgba(255,255,255,0.94), rgba(248,248,250,0.9))',
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
            <span style={{
              width: 12,
              height: 12,
              borderRadius: 999,
              background: '#ff5f57',
              boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.08)'
            }}/>
            <span style={{
              width: 12,
              height: 12,
              borderRadius: 999,
              background: '#febc2e',
              boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.08)'
            }}/>
            <span style={{
              width: 12,
              height: 12,
              borderRadius: 999,
              background: '#28c840',
              boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.08)'
            }}/>
          </div>
          <div style={{textAlign: 'center', overflow: 'hidden'}}>
            <div style={{
              fontSize: 13,
              fontWeight: 600,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              {title}
            </div>
            {subtitle ? (
              <div
                style={{
                  fontSize: 11,
                  color: textColorMap.secondary,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {subtitle}
              </div>
            ) : null}
            {id ? (
              <div
                style={{
                  fontSize: 10,
                  color: textColorMap.tertiary,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {id}
              </div>
            ) : null}
          </div>
          <div/>
        </div>
        <div style={{minHeight: 0, overflow: 'hidden'}}>
          {contentScrollAxes ? (
            <ScrollView
              axes={contentScrollAxes}
              showsIndicators={contentShowsIndicators}
              frame={{ maxWidth: 'infinity', maxHeight: 'infinity' }}
            >
              {children}
            </ScrollView>
          ) : (
            children
          )}
        </div>
      </div>
    </div>
  )
}
