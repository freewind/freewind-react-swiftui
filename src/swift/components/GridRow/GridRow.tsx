import type { FC } from 'react'
import { createNativePlaceholder, type NativePlaceholderProps } from '../_internal/createNativePlaceholder'

export type GridRowProps = NativePlaceholderProps

export const GridRow: FC<GridRowProps> = createNativePlaceholder('GridRow', 'Placeholder for SwiftUI GridRow.')
