import type { FC } from 'react'
import { createNativePlaceholder, type NativePlaceholderProps } from '../_internal/createNativePlaceholder'

export type SceneProps = NativePlaceholderProps

export const Scene: FC<SceneProps> = createNativePlaceholder('Scene', 'Placeholder for SwiftUI Scene.')
