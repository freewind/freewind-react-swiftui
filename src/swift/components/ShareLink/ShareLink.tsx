import type { FC } from 'react'
import { createNativePlaceholder, type NativePlaceholderProps } from '../_internal/createNativePlaceholder'

export type ShareLinkProps = NativePlaceholderProps

export const ShareLink: FC<ShareLinkProps> = createNativePlaceholder('ShareLink', 'Placeholder for SwiftUI ShareLink.')
