import type { FC } from 'react'
import { createNativePlaceholder, type NativePlaceholderProps } from '../_internal/createNativePlaceholder'

export type TimelineViewProps = NativePlaceholderProps

export const TimelineView: FC<TimelineViewProps> = createNativePlaceholder('TimelineView', 'Placeholder for SwiftUI TimelineView.')
