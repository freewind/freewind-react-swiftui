import type { FC } from 'react'
import {
  ButtonComponentDemo,
  ContextMenuComponentDemo,
  DividerComponentDemo,
  DropAreaComponentDemo,
  GeometryReaderComponentDemo,
  HStackComponentDemo,
  ImageComponentDemo,
  LabelComponentDemo,
  LazyHStackComponentDemo,
  PickerComponentDemo,
  RoundedRectangleComponentDemo,
  ScrollViewComponentDemo,
  ScrollViewReaderComponentDemo,
  SheetComponentDemo,
  SpacerComponentDemo,
  TextComponentDemo,
  TextEditorComponentDemo,
  TextFieldComponentDemo,
  TokenColorComponentDemo,
  VStackComponentDemo,
  WindowAccessorComponentDemo,
} from './componentsPages'
import { DashboardLayouts, FormAndSheetLayouts, SplitViewLayouts } from './layoutPages'
import { EmojiDemo, FileBrowserDemo, ImageBrowserDemo, QQDemo, SystemApiMockDemo, TodoDemo } from './appPages'
import { NativeSwiftSourceDemo, TranslatorSpecDemo } from './translatorPages'

export const renderDemoPage = (pageId: string) => {
  const pages: Record<string, FC> = {
    'component-text': TextComponentDemo,
    'component-button': ButtonComponentDemo,
    'component-image': ImageComponentDemo,
    'component-label': LabelComponentDemo,
    'component-picker': PickerComponentDemo,
    'component-text-field': TextFieldComponentDemo,
    'component-text-editor': TextEditorComponentDemo,
    'component-vstack': VStackComponentDemo,
    'component-hstack': HStackComponentDemo,
    'component-spacer': SpacerComponentDemo,
    'component-divider': DividerComponentDemo,
    'component-scroll-view': ScrollViewComponentDemo,
    'component-lazy-hstack': LazyHStackComponentDemo,
    'component-sheet': SheetComponentDemo,
    'component-context-menu': ContextMenuComponentDemo,
    'component-rounded-rectangle': RoundedRectangleComponentDemo,
    'component-token-color': TokenColorComponentDemo,
    'component-geometry-reader': GeometryReaderComponentDemo,
    'component-scroll-view-reader': ScrollViewReaderComponentDemo,
    'component-drop-area': DropAreaComponentDemo,
    'component-window-accessor': WindowAccessorComponentDemo,
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
