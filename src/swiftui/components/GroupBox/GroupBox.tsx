import type { FC } from 'react'
import { createNativePlaceholder, type NativePlaceholderProps } from '../_internal/createNativePlaceholder'

export type GroupBoxProps = NativePlaceholderProps

export const GroupBox: FC<GroupBoxProps> = createNativePlaceholder('GroupBox', 'Placeholder for SwiftUI GroupBox.')
