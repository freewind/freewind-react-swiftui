import type { ForegroundStyleToken, MaterialToken } from '../../types'

const foregroundTokens: readonly ForegroundStyleToken[] = [
  'primary',
  'secondary',
  'tertiary',
  'red',
  'blue',
  'green',
  'accentColor',
]

export const isForegroundToken = (
  value: ForegroundStyleToken | MaterialToken,
): value is ForegroundStyleToken => {
  return (foregroundTokens as readonly string[]).includes(value)
}

export const materialValue = (material: MaterialToken): string => {
  return material === 'ultraThinMaterial'
    ? 'var(--swui-ultra-thin-material)'
    : 'var(--swui-material)'
}
