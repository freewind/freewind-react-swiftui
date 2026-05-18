import type { FrameAlignment } from '../../types'

export const mapFrameAlignment = (alignment?: FrameAlignment): string | undefined => {
  if (alignment === undefined) {
    return undefined
  }

  switch (alignment) {
    case 'leading':
      return 'flex-start center'
    case 'trailing':
      return 'flex-end center'
    case 'top':
      return 'center flex-start'
    case 'bottom':
      return 'center flex-end'
    case 'topLeading':
      return 'flex-start flex-start'
    case 'topTrailing':
      return 'flex-end flex-start'
    case 'bottomLeading':
      return 'flex-start flex-end'
    case 'bottomTrailing':
      return 'flex-end flex-end'
    case 'center':
      return 'center center'
    default:
      return undefined
  }
}
