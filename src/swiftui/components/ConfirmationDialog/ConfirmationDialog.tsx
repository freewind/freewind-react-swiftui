import type { FC } from 'react'
import { createNativePlaceholder, type NativePlaceholderProps } from '../_internal/createNativePlaceholder'

export type ConfirmationDialogProps = NativePlaceholderProps

export const ConfirmationDialog: FC<ConfirmationDialogProps> = createNativePlaceholder('ConfirmationDialog', 'Placeholder for SwiftUI ConfirmationDialog.')
