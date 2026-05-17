import type { FC } from 'react'
import { createNativePlaceholder, type NativePlaceholderProps } from '../_internal/createNativePlaceholder'

export type CommandsProps = NativePlaceholderProps

export const Commands: FC<CommandsProps> = createNativePlaceholder('Commands', 'Placeholder for SwiftUI Commands.')
