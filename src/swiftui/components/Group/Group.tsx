import type { FC } from 'react'
import { createNativePlaceholder, type NativePlaceholderProps } from '../_internal/createNativePlaceholder'

export type GroupProps = NativePlaceholderProps

export const Group: FC<GroupProps> = createNativePlaceholder('Group', 'Placeholder for SwiftUI Group.')
