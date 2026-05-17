import type { FC } from 'react'
import { AlertDemo } from '../swift/components/Alert'
import { ButtonDemo } from '../swift/components/Button'
import { CanvasDemo } from '../swift/components/Canvas'
import { ContextMenuDemo } from '../swift/components/ContextMenu'
import { DatePickerDemo } from '../swift/components/DatePicker'
import { DividerDemo } from '../swift/components/Divider'
import { EditButtonDemo } from '../swift/components/EditButton'
import { FormDemo } from '../swift/components/Form'
import { GaugeDemo } from '../swift/components/Gauge'
import { DropAreaDemo } from '../swift/custom-components/DropArea'
import { GeometryReaderDemo } from '../swift/components/GeometryReader'
import { GridDemo } from '../swift/components/Grid'
import { HStackDemo } from '../swift/components/HStack'
import { ImageDemo } from '../swift/components/Image'
import { LabelDemo } from '../swift/components/Label'
import { LinkDemo } from '../swift/components/Link'
import { ListDemo } from '../swift/components/List'
import { LazyVGridDemo } from '../swift/components/LazyVGrid'
import { LazyHStackDemo } from '../swift/components/LazyHStack'
import { MapDemo } from '../swift/components/Map'
import { DisclosureGroupDemo } from '../swift/components/DisclosureGroup'
import { MenuDemo } from '../swift/components/Menu'
import { NavigationLinkDemo } from '../swift/components/NavigationLink'
import { NavigationStackDemo } from '../swift/components/NavigationStack'
import { OutlineGroupDemo } from '../swift/components/OutlineGroup'
import { PopconfirmDemo } from '../swift/custom-components/Popconfirm'
import { PickerDemo } from '../swift/components/Picker'
import { PopoverDemo } from '../swift/components/Popover'
import { ProgressViewDemo } from '../swift/components/ProgressView'
import { RoundedRectangleDemo } from '../swift/components/RoundedRectangle'
import { ScrollViewDemo } from '../swift/components/ScrollView'
import { ScrollViewReaderDemo } from '../swift/components/ScrollViewReader'
import { SecureFieldDemo } from '../swift/components/SecureField'
import { SectionDemo } from '../swift/components/Section'
import { SheetDemo } from '../swift/components/Sheet'
import { SliderDemo } from '../swift/components/Slider'
import { SpacerDemo } from '../swift/components/Spacer'
import { StepperDemo } from '../swift/components/Stepper'
import { TableDemo } from '../swift/components/Table'
import { TabViewDemo } from '../swift/components/TabView'
import { TextDemo } from '../swift/components/Text'
import { TextEditorDemo } from '../swift/components/TextEditor'
import { TextFieldDemo } from '../swift/components/TextField'
import { TokenColorDemo } from '../swift/custom-components/TokenColor'
import { ToggleDemo } from '../swift/components/Toggle'
import { VStackDemo } from '../swift/components/VStack'
import { WindowAccessorDemo } from '../swift/custom-components/WindowAccessor'
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
    'component-alert': AlertDemo,
    'component-label': LabelDemo,
    'component-edit-button': EditButtonDemo,
    'component-link': LinkDemo,
    'component-list': ListDemo,
    'component-secure-field': SecureFieldDemo,
    'component-section': SectionDemo,
    'component-navigation-link': NavigationLinkDemo,
    'component-navigation-stack': NavigationStackDemo,
    'component-popover': PopoverDemo,
    'component-popconfirm': PopconfirmDemo,
    'component-picker': PickerDemo,
    'component-date-picker': DatePickerDemo,
    'component-gauge': GaugeDemo,
    'component-toggle': ToggleDemo,
    'component-progress-view': ProgressViewDemo,
    'component-slider': SliderDemo,
    'component-stepper': StepperDemo,
    'component-table': TableDemo,
    'component-text-field': TextFieldDemo,
    'component-text-editor': TextEditorDemo,
    'component-form': FormDemo,
    'component-vstack': VStackDemo,
    'component-hstack': HStackDemo,
    'component-grid': GridDemo,
    'component-spacer': SpacerDemo,
    'component-divider': DividerDemo,
    'component-scroll-view': ScrollViewDemo,
    'component-lazy-hstack': LazyHStackDemo,
    'component-lazy-vgrid': LazyVGridDemo,
    'component-canvas': CanvasDemo,
    'component-sheet': SheetDemo,
    'component-tab-view': TabViewDemo,
    'component-context-menu': ContextMenuDemo,
    'component-menu': MenuDemo,
    'component-disclosure-group': DisclosureGroupDemo,
    'component-rounded-rectangle': RoundedRectangleDemo,
    'component-outline-group': OutlineGroupDemo,
    'component-token-color': TokenColorDemo,
    'component-geometry-reader': GeometryReaderDemo,
    'component-map': MapDemo,
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
