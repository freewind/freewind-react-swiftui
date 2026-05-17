import type { FC } from 'react'
import { createNativePlaceholder, type NativePlaceholderProps } from '../_internal/createNativePlaceholder'

export type MeshGradientProps = NativePlaceholderProps

export const MeshGradient: FC<MeshGradientProps> = createNativePlaceholder('MeshGradient', 'Placeholder for SwiftUI MeshGradient.')
