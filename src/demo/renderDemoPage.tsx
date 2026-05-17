import type { FC } from 'react'
import { ButtonDemo } from '../swiftui/components/Button'
import { ContextMenuDemo } from '../swiftui/components/ContextMenu'
import { DividerDemo } from '../swiftui/components/Divider'
import { DropAreaDemo } from '../swiftui/custom-components/DropArea'
import { GeometryReaderDemo } from '../swiftui/components/GeometryReader'
import { HStackDemo } from '../swiftui/components/HStack'
import { ImageDemo } from '../swiftui/components/Image'
import { LabelDemo } from '../swiftui/components/Label'
import { ListDemo } from '../swiftui/components/List'
import { LazyVGridDemo } from '../swiftui/components/LazyVGrid'
import { LazyHStackDemo } from '../swiftui/components/LazyHStack'
import { DisclosureGroupDemo } from '../swiftui/components/DisclosureGroup'
import { MenuDemo } from '../swiftui/components/Menu'
import { NavigationLinkDemo } from '../swiftui/components/NavigationLink'
import { PopconfirmDemo } from '../swiftui/custom-components/Popconfirm'
import { PickerDemo } from '../swiftui/components/Picker'
import { PopoverDemo } from '../swiftui/components/Popover'
import { ProgressViewDemo } from '../swiftui/components/ProgressView'
import { RoundedRectangleDemo } from '../swiftui/components/RoundedRectangle'
import { ScrollViewDemo } from '../swiftui/components/ScrollView'
import { ScrollViewReaderDemo } from '../swiftui/components/ScrollViewReader'
import { SectionDemo } from '../swiftui/components/Section'
import { SheetDemo } from '../swiftui/components/Sheet'
import { SliderDemo } from '../swiftui/components/Slider'
import { SpacerDemo } from '../swiftui/components/Spacer'
import { StepperDemo } from '../swiftui/components/Stepper'
import { TableDemo } from '../swiftui/components/Table'
import { TabViewDemo } from '../swiftui/components/TabView'
import { TextDemo } from '../swiftui/components/Text'
import { TextEditorDemo } from '../swiftui/components/TextEditor'
import { TextFieldDemo } from '../swiftui/components/TextField'
import { TokenColorDemo } from '../swiftui/custom-components/TokenColor'
import { ToggleDemo } from '../swiftui/components/Toggle'
import { VStackDemo } from '../swiftui/components/VStack'
import { WindowAccessorDemo } from '../swiftui/custom-components/WindowAccessor'
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
