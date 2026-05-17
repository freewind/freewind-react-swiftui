import type { FC } from 'react'
import { createNativePlaceholder, type NativePlaceholderProps } from '../_internal/createNativePlaceholder'

export type EditButtonProps = NativePlaceholderProps

export const EditButton: FC<EditButtonProps> = createNativePlaceholder('EditButton', 'Placeholder for SwiftUI EditButton.')
