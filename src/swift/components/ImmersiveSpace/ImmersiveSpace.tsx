import type { FC } from 'react'
import { createNativePlaceholder, type NativePlaceholderProps } from '../_internal/createNativePlaceholder'

export type ImmersiveSpaceProps = NativePlaceholderProps

export const ImmersiveSpace: FC<ImmersiveSpaceProps> = createNativePlaceholder('ImmersiveSpace', 'Placeholder for SwiftUI ImmersiveSpace.')
