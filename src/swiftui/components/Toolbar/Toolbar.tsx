import type { FC } from 'react'
import { createNativePlaceholder, type NativePlaceholderProps } from '../_internal/createNativePlaceholder'

export type ToolbarProps = NativePlaceholderProps

export const Toolbar: FC<ToolbarProps> = createNativePlaceholder('Toolbar', 'Placeholder for SwiftUI Toolbar.')
