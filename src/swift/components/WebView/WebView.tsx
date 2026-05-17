import type { FC } from 'react'
import { createNativePlaceholder, type NativePlaceholderProps } from '../_internal/createNativePlaceholder'

export type WebViewProps = NativePlaceholderProps

export const WebView: FC<WebViewProps> = createNativePlaceholder('WebView', 'Placeholder for SwiftUI WebView.')
