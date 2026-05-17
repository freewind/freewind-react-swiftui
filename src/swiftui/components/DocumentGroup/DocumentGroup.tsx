import type { FC } from 'react'
import { createNativePlaceholder, type NativePlaceholderProps } from '../_internal/createNativePlaceholder'

export type DocumentGroupProps = NativePlaceholderProps

export const DocumentGroup: FC<DocumentGroupProps> = createNativePlaceholder('DocumentGroup', 'Placeholder for SwiftUI DocumentGroup.')
