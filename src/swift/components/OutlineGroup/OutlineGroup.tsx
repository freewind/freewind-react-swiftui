import type { FC } from 'react'
import { createNativePlaceholder, type NativePlaceholderProps } from '../_internal/createNativePlaceholder'

export type OutlineGroupProps = NativePlaceholderProps

export const OutlineGroup: FC<OutlineGroupProps> = createNativePlaceholder('OutlineGroup', 'Placeholder for SwiftUI OutlineGroup.')
