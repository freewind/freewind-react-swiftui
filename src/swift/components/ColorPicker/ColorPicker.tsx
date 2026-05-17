import type { FC } from 'react'
import { createNativePlaceholder, type NativePlaceholderProps } from '../_internal/createNativePlaceholder'

export type ColorPickerProps = NativePlaceholderProps

export const ColorPicker: FC<ColorPickerProps> = createNativePlaceholder('ColorPicker', 'Placeholder for SwiftUI ColorPicker.')
