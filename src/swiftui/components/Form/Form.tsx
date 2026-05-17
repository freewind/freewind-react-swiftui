import type { FC } from 'react'
import { createNativePlaceholder, type NativePlaceholderProps } from '../_internal/createNativePlaceholder'

export type FormProps = NativePlaceholderProps

export const Form: FC<FormProps> = createNativePlaceholder('Form', 'Placeholder for SwiftUI Form.')
