import type { FC } from 'react'
import { createNativePlaceholder, type NativePlaceholderProps } from '../_internal/createNativePlaceholder'

export type HelpLinkProps = NativePlaceholderProps

export const HelpLink: FC<HelpLinkProps> = createNativePlaceholder('HelpLink', 'Placeholder for SwiftUI HelpLink.')
