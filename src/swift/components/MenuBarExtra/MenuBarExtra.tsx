import type { FC } from 'react'
import { createNativePlaceholder, type NativePlaceholderProps } from '../_internal/createNativePlaceholder'

export type MenuBarExtraProps = NativePlaceholderProps

export const MenuBarExtra: FC<MenuBarExtraProps> = createNativePlaceholder('MenuBarExtra', 'Placeholder for SwiftUI MenuBarExtra.')
