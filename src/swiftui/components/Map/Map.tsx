import type { FC } from 'react'
import { createNativePlaceholder, type NativePlaceholderProps } from '../_internal/createNativePlaceholder'

export type MapProps = NativePlaceholderProps

export const Map: FC<MapProps> = createNativePlaceholder('Map', 'Placeholder for SwiftUI Map.')
