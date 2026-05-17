import type { FC } from 'react'
import { createNativePlaceholder, type NativePlaceholderProps } from '../_internal/createNativePlaceholder'

export type DatePickerProps = NativePlaceholderProps

export const DatePicker: FC<DatePickerProps> = createNativePlaceholder('DatePicker', 'Placeholder for SwiftUI DatePicker.')
