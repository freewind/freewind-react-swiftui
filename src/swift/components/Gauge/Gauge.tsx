import type { FC } from 'react'
import { createNativePlaceholder, type NativePlaceholderProps } from '../_internal/createNativePlaceholder'

export type GaugeProps = NativePlaceholderProps

export const Gauge: FC<GaugeProps> = createNativePlaceholder('Gauge', 'Placeholder for SwiftUI Gauge.')
