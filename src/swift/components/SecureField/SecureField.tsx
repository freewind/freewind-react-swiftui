import type { FC } from 'react'
import { createNativePlaceholder, type NativePlaceholderProps } from '../_internal/createNativePlaceholder'

export type SecureFieldProps = NativePlaceholderProps

export const SecureField: FC<SecureFieldProps> = createNativePlaceholder('SecureField', 'Placeholder for SwiftUI SecureField.')
