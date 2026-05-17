import type { FC } from 'react'
import {
  ButtonComponentDemo,
  ContainerComponentDemo,
  ImageLabelComponentDemo,
  InputComponentDemo,
  LayoutComponentDemo,
  NativeMockComponentDemo,
  ShapeTokenComponentDemo,
  TextComponentDemo,
} from './componentsPages'
import { DashboardLayouts, FormAndSheetLayouts, SplitViewLayouts } from './layoutPages'
import { EmojiDemo, FileBrowserDemo, ImageBrowserDemo, QQDemo, SystemApiMockDemo, TodoDemo } from './appPages'
import { NativeSwiftSourceDemo, TranslatorSpecDemo } from './translatorPages'

export const renderDemoPage = (pageId: string) => {
  const pages: Record<string, FC> = {
    'component-text': TextComponentDemo,
    'component-button': ButtonComponentDemo,
    'component-image-label': ImageLabelComponentDemo,
    'component-input': InputComponentDemo,
    'component-layout': LayoutComponentDemo,
    'component-container': ContainerComponentDemo,
    'component-shape': ShapeTokenComponentDemo,
    'component-native': NativeMockComponentDemo,
    translator: TranslatorSpecDemo,
    'native-swift': NativeSwiftSourceDemo,
    'split-view': SplitViewLayouts,
    dashboard: DashboardLayouts,
    'form-sheet': FormAndSheetLayouts,
    qq: QQDemo,
    todo: TodoDemo,
    emoji: EmojiDemo,
    'image-browser': ImageBrowserDemo,
    'file-browser': FileBrowserDemo,
    'system-api': SystemApiMockDemo,
  }

  const Page = pages[pageId] ?? TextComponentDemo
  return <Page />
}
