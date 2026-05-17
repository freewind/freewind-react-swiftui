import type { FC } from 'react'
import { createNativePlaceholder, type NativePlaceholderProps } from '../_internal/createNativePlaceholder'

export type GradientProps = NativePlaceholderProps

export const Gradient: FC<GradientProps> = createNativePlaceholder('Gradient', 'Placeholder for SwiftUI Gradient.')
