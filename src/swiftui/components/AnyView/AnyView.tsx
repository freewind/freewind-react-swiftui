import type { FC } from 'react'
import { createNativePlaceholder, type NativePlaceholderProps } from '../_internal/createNativePlaceholder'

export type AnyViewProps = NativePlaceholderProps

export const AnyView: FC<AnyViewProps> = createNativePlaceholder('AnyView', 'Placeholder for SwiftUI AnyView.')
