import type { StackAlignment } from '../../types'

export const mapStackAlignment = (axis: 'horizontal' | 'vertical', alignment: StackAlignment): string => {
  if (axis === 'vertical') {
    switch (alignment) {
      case 'leading':
        return 'flex-start'
      case 'trailing':
        return 'flex-end'
      default:
        return 'center'
    }
  }

  switch (alignment) {
    case 'top':
      return 'flex-start'
    case 'bottom':
      return 'flex-end'
    default:
      return 'center'
  }
}
