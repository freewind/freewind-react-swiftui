import type { FC } from 'react'
import { ButtonDemo } from '../swiftui/Button'
import { ContextMenuDemo } from '../swiftui/ContextMenu'
import { DividerDemo } from '../swiftui/Divider'
import { DropAreaDemo } from '../swiftui/DropArea'
import { GeometryReaderDemo } from '../swiftui/GeometryReader'
import { HStackDemo } from '../swiftui/HStack'
import { ImageDemo } from '../swiftui/Image'
import { LabelDemo } from '../swiftui/Label'
import { ListDemo } from '../swiftui/List'
import { LazyVGridDemo } from '../swiftui/LazyVGrid'
import { LazyHStackDemo } from '../swiftui/LazyHStack'
import { DisclosureGroupDemo } from '../swiftui/DisclosureGroup'
import { MenuDemo } from '../swiftui/Menu'
import { NavigationLinkDemo } from '../swiftui/NavigationLink'
import { PopconfirmDemo } from '../swiftui/Popconfirm'
import { PickerDemo } from '../swiftui/Picker'
import { PopoverDemo } from '../swiftui/Popover'
import { ProgressViewDemo } from '../swiftui/ProgressView'
import { RoundedRectangleDemo } from '../swiftui/RoundedRectangle'
import { ScrollViewDemo } from '../swiftui/ScrollView'
import { ScrollViewReaderDemo } from '../swiftui/ScrollViewReader'
import { SectionDemo } from '../swiftui/Section'
import { SheetDemo } from '../swiftui/Sheet'
import { SliderDemo } from '../swiftui/Slider'
import { SpacerDemo } from '../swiftui/Spacer'
import { StepperDemo } from '../swiftui/Stepper'
import { TableDemo } from '../swiftui/Table'
import { TabViewDemo } from '../swiftui/TabView'
import { TextDemo } from '../swiftui/Text'
import { TextEditorDemo } from '../swiftui/TextEditor'
import { TextFieldDemo } from '../swiftui/TextField'
import { TokenColorDemo } from '../swiftui/TokenColor'
import { ToggleDemo } from '../swiftui/Toggle'
import { VStackDemo } from '../swiftui/VStack'
import { WindowAccessorDemo } from '../swiftui/WindowAccessor'
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
    'component-list': ListDemo,
    'component-section': SectionDemo,
    'component-navigation-link': NavigationLinkDemo,
    'component-popover': PopoverDemo,
    'component-popconfirm': PopconfirmDemo,
    'component-picker': PickerDemo,
    'component-toggle': ToggleDemo,
    'component-progress-view': ProgressViewDemo,
    'component-slider': SliderDemo,
    'component-stepper': StepperDemo,
    'component-table': TableDemo,
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
