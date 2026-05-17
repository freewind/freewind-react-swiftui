import type { FC } from 'react'
import { createNativePlaceholder, type NativePlaceholderProps } from '../_internal/createNativePlaceholder'

export type NavigationStackProps = NativePlaceholderProps

export const NavigationStack: FC<NavigationStackProps> = createNativePlaceholder('NavigationStack', 'Placeholder for SwiftUI NavigationStack.')
