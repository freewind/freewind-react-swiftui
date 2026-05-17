import type { FC } from 'react'
import { createNativePlaceholder, type NativePlaceholderProps } from '../_internal/createNativePlaceholder'

export type LazyHGridProps = NativePlaceholderProps

export const LazyHGrid: FC<LazyHGridProps> = createNativePlaceholder('LazyHGrid', 'Placeholder for SwiftUI LazyHGrid.')
