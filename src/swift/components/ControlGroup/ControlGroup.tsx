import type { FC } from 'react'
import { createNativePlaceholder, type NativePlaceholderProps } from '../_internal/createNativePlaceholder'

export type ControlGroupProps = NativePlaceholderProps

export const ControlGroup: FC<ControlGroupProps> = createNativePlaceholder('ControlGroup', 'Placeholder for SwiftUI ControlGroup.')
