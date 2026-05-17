import type { FC } from 'react'
import { createNativePlaceholder, type NativePlaceholderProps } from '../_internal/createNativePlaceholder'

export type AlertProps = NativePlaceholderProps

export const Alert: FC<AlertProps> = createNativePlaceholder('Alert', 'Placeholder for SwiftUI Alert.')
