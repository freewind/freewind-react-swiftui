import type { FC } from 'react'
import { createNativePlaceholder, type NativePlaceholderProps } from '../_internal/createNativePlaceholder'

export type CircleProps = NativePlaceholderProps

export const Circle: FC<CircleProps> = createNativePlaceholder('Circle', 'Placeholder for SwiftUI Circle.')
