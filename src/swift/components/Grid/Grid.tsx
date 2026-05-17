import type { FC } from 'react'
import { createNativePlaceholder, type NativePlaceholderProps } from '../_internal/createNativePlaceholder'

export type GridProps = NativePlaceholderProps

export const Grid: FC<GridProps> = createNativePlaceholder('Grid', 'Placeholder for SwiftUI Grid.')
