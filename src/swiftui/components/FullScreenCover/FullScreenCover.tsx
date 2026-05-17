import type { FC } from 'react'
import { createNativePlaceholder, type NativePlaceholderProps } from '../_internal/createNativePlaceholder'

export type FullScreenCoverProps = NativePlaceholderProps

export const FullScreenCover: FC<FullScreenCoverProps> = createNativePlaceholder('FullScreenCover', 'Placeholder for SwiftUI FullScreenCover.')
