import type { FC } from 'react'
import { createNativePlaceholder, type NativePlaceholderProps } from '../_internal/createNativePlaceholder'

export type PasteButtonProps = NativePlaceholderProps

export const PasteButton: FC<PasteButtonProps> = createNativePlaceholder('PasteButton', 'Placeholder for SwiftUI PasteButton.')
