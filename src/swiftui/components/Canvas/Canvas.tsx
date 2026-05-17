import type { FC } from 'react'
import { createNativePlaceholder, type NativePlaceholderProps } from '../_internal/createNativePlaceholder'

export type CanvasProps = NativePlaceholderProps

export const Canvas: FC<CanvasProps> = createNativePlaceholder('Canvas', 'Placeholder for SwiftUI Canvas.')
