import type { FC } from 'react'
import { ButtonDemo } from '../swiftui/Button.demo'
import { ContextMenuDemo } from '../swiftui/ContextMenu.demo'
import { DividerDemo } from '../swiftui/Divider.demo'
import { DropAreaDemo } from '../swiftui/DropArea.demo'
import { GeometryReaderDemo } from '../swiftui/GeometryReader.demo'
import { HStackDemo } from '../swiftui/HStack.demo'
import { ImageDemo } from '../swiftui/Image.demo'
import { LabelDemo } from '../swiftui/Label.demo'
import { LazyVGridDemo } from '../swiftui/LazyVGrid.demo'
import { LazyHStackDemo } from '../swiftui/LazyHStack.demo'
import { DisclosureGroupDemo } from '../swiftui/DisclosureGroup.demo'
import { MenuDemo } from '../swiftui/Menu.demo'
import { PickerDemo } from '../swiftui/Picker.demo'
import { ProgressViewDemo } from '../swiftui/ProgressView.demo'
import { RoundedRectangleDemo } from '../swiftui/RoundedRectangle.demo'
import { ScrollViewDemo } from '../swiftui/ScrollView.demo'
import { ScrollViewReaderDemo } from '../swiftui/ScrollViewReader.demo'
import { SheetDemo } from '../swiftui/Sheet.demo'
import { SpacerDemo } from '../swiftui/Spacer.demo'
import { TabViewDemo } from '../swiftui/TabView.demo'
import { TextDemo } from '../swiftui/Text.demo'
import { TextEditorDemo } from '../swiftui/TextEditor.demo'
import { TextFieldDemo } from '../swiftui/TextField.demo'
import { TokenColorDemo } from '../swiftui/TokenColor.demo'
import { ToggleDemo } from '../swiftui/Toggle.demo'
import { VStackDemo } from '../swiftui/VStack.demo'
import { WindowAccessorDemo } from '../swiftui/WindowAccessor.demo'
import { DashboardDemo } from './Dashboard.demo'
import { EmojiDemo } from './Emoji.demo'
import { FileBrowserDemo } from './FileBrowser.demo'
import { FormSheetDemo } from './FormSheet.demo'
import { ImageBrowserDemo } from './ImageBrowser.demo'
import { NativeSwiftSourceDemo } from './NativeSwiftSource.demo'
import { QQDemo } from './QQ.demo'
import { SplitViewDemo } from './SplitView.demo'
import { SystemApiMockDemo } from './SystemApiMock.demo'
import { TodoDemo } from './Todo.demo'
import { TranslatorSpecDemo } from './TranslatorSpec.demo'

export const renderDemoPage = (pageId: string) => {
  const pages: Record<string, FC> = {
    'component-text': TextDemo,
    'component-button': ButtonDemo,
    'component-image': ImageDemo,
    'component-label': LabelDemo,
    'component-picker': PickerDemo,
    'component-toggle': ToggleDemo,
    'component-progress-view': ProgressViewDemo,
    'component-text-field': TextFieldDemo,
    'component-text-editor': TextEditorDemo,
    'component-vstack': VStackDemo,
    'component-hstack': HStackDemo,
    'component-spacer': SpacerDemo,
    'component-divider': DividerDemo,
    'component-scroll-view': ScrollViewDemo,
    'component-lazy-hstack': LazyHStackDemo,
    'component-lazy-vgrid': LazyVGridDemo,
    'component-sheet': SheetDemo,
    'component-tab-view': TabViewDemo,
    'component-context-menu': ContextMenuDemo,
    'component-menu': MenuDemo,
    'component-disclosure-group': DisclosureGroupDemo,
    'component-rounded-rectangle': RoundedRectangleDemo,
    'component-token-color': TokenColorDemo,
    'component-geometry-reader': GeometryReaderDemo,
    'component-scroll-view-reader': ScrollViewReaderDemo,
    'component-drop-area': DropAreaDemo,
    'component-window-accessor': WindowAccessorDemo,
    translator: TranslatorSpecDemo,
    'native-swift': NativeSwiftSourceDemo,
    'split-view': SplitViewDemo,
    dashboard: DashboardDemo,
    'form-sheet': FormSheetDemo,
    qq: QQDemo,
    todo: TodoDemo,
    emoji: EmojiDemo,
    'image-browser': ImageBrowserDemo,
    'file-browser': FileBrowserDemo,
    'system-api': SystemApiMockDemo,
  }

  const Page = pages[pageId] ?? TextDemo
  return <Page />
}
