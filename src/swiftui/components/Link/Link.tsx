import type { FC } from 'react'
import { createNativePlaceholder, type NativePlaceholderProps } from '../_internal/createNativePlaceholder'

export type LinkProps = NativePlaceholderProps

export const Link: FC<LinkProps> = createNativePlaceholder('Link', 'Placeholder for SwiftUI Link.')
