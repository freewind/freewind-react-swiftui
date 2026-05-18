import type { FC } from 'react'
import { AnyViewDemo } from '../../swift/components/AnyView'
import { AlertDemo } from '../../swift/components/Alert'
import { ButtonDemo } from '../../swift/components/Button'
import { CapsuleDemo } from '../../swift/components/Capsule'
import { CanvasDemo } from '../../swift/components/Canvas'
import { CircleDemo } from '../../swift/components/Circle'
import { ColorDemo } from '../../swift/components/Color'
import { ColorPickerDemo } from '../../swift/components/ColorPicker'
import { CommandsDemo } from '../../swift/components/Commands'
import { ConfirmationDialogDemo } from '../../swift/components/ConfirmationDialog'
import { ContextMenuDemo } from '../../swift/components/ContextMenu'
import { ControlGroupDemo } from '../../swift/components/ControlGroup'
import { DatePickerDemo } from '../../swift/components/DatePicker'
import { DividerDemo } from '../../swift/components/Divider'
import { DocumentGroupDemo } from '../../swift/components/DocumentGroup'
import { EditButtonDemo } from '../../swift/components/EditButton'
import { ForEachDemo } from '../../swift/components/ForEach'
import { FormDemo } from '../../swift/components/Form'
import { FullScreenCoverDemo } from '../../swift/components/FullScreenCover'
import { GaugeDemo } from '../../swift/components/Gauge'
import { DropAreaDemo } from '../../swift/components/DropArea'
import { GeometryReaderDemo } from '../../swift/components/GeometryReader'
import { GradientDemo } from '../../swift/components/Gradient'
import { GridDemo } from '../../swift/components/Grid'
import { GridRowDemo } from '../../swift/components/GridRow'
import { GroupDemo } from '../../swift/components/Group'
import { GroupBoxDemo } from '../../swift/components/GroupBox'
import { HStackDemo } from '../../swift/components/HStack'
import { HelpLinkDemo } from '../../swift/components/HelpLink'
import { ImageDemo } from '../../swift/components/Image'
import { ImmersiveSpaceDemo } from '../../swift/components/ImmersiveSpace'
import { LabelDemo } from '../../swift/components/Label'
import { LazyHGridDemo } from '../../swift/components/LazyHGrid'
import { LinkDemo } from '../../swift/components/Link'
import { ListDemo } from '../../swift/components/List'
import { LazyVStackDemo } from '../../swift/components/LazyVStack'
import { LazyVGridDemo } from '../../swift/components/LazyVGrid'
import { LazyHStackDemo } from '../../swift/components/LazyHStack'
import { MapDemo } from '../../swift/components/Map'
import { MenuBarExtraDemo } from '../../swift/components/MenuBarExtra'
import { MeshGradientDemo } from '../../swift/components/MeshGradient'
import { DisclosureGroupDemo } from '../../swift/components/DisclosureGroup'
import { MenuDemo } from '../../swift/components/Menu'
import { NavigationLinkDemo } from '../../swift/components/NavigationLink'
import { NavigationStackDemo } from '../../swift/components/NavigationStack'
import { OutlineGroupDemo } from '../../swift/components/OutlineGroup'
import { PasteButtonDemo } from '../../swift/components/PasteButton'
import { PopconfirmDemo } from '../../swift/components/Popconfirm'
import { PickerDemo } from '../../swift/components/Picker'
import { PopoverDemo } from '../../swift/components/Popover'
import { ProgressViewDemo } from '../../swift/components/ProgressView'
import { RectangleDemo } from '../../swift/components/Rectangle'
import { RoundedRectangleDemo } from '../../swift/components/RoundedRectangle'
import { RuntimeStateDemo } from '../../swift/components/RuntimeState'
import { ScrollViewDemo } from '../../swift/components/ScrollView'
import { ScrollViewReaderDemo } from '../../swift/components/ScrollViewReader'
import { SceneDemo } from '../../swift/components/Scene'
import { SecureFieldDemo } from '../../swift/components/SecureField'
import { SectionDemo } from '../../swift/components/Section'
import { ShareLinkDemo } from '../../swift/components/ShareLink'
import { SheetDemo } from '../../swift/components/Sheet'
import { SliderDemo } from '../../swift/components/Slider'
import { SpacerDemo } from '../../swift/components/Spacer'
import { StepperDemo } from '../../swift/components/Stepper'
import { TableDemo } from '../../swift/components/Table'
import { TabViewDemo } from '../../swift/components/TabView'
import { TextDemo } from '../../swift/components/Text'
import { TextEditorDemo } from '../../swift/components/TextEditor'
import { TextFieldDemo } from '../../swift/components/TextField'
import { TimelineViewDemo } from '../../swift/components/TimelineView'
import { TokenColorDemo } from '../../swift/components/TokenColor'
import { ToggleDemo } from '../../swift/components/Toggle'
import { ToolbarDemo } from '../../swift/components/Toolbar'
import { VStackDemo } from '../../swift/components/VStack'
import { WebViewDemo } from '../../swift/components/WebView'
import { WindowAccessorDemo } from '../../swift/components/WindowAccessor'
import { WindowGroupDemo } from '../../swift/components/WindowGroup'
import { ZStackDemo } from '../../swift/components/ZStack'
import { DashboardDemo, FormSheetDemo, SplitViewDemo } from '../layouts'
import { FileBrowserDemo } from '../file-browser'
import { ImageBrowserDemo } from '../image-browser'
import { QQDemo } from '../qq'
import { SystemApiMockDemo } from '../system-api'
import { TodoDemo } from '../todo'
import { TranslatorSpecDemo } from '../translator'

export const renderDemoPage = (pageId: string) => {
  const pages: Record<string, FC> = {
    'component-text': TextDemo,
    'component-any-view': AnyViewDemo,
    'component-button': ButtonDemo,
    'component-image': ImageDemo,
    'component-alert': AlertDemo,
    'component-confirmation-dialog': ConfirmationDialogDemo,
    'component-full-screen-cover': FullScreenCoverDemo,
    'component-label': LabelDemo,
    'component-edit-button': EditButtonDemo,
    'component-paste-button': PasteButtonDemo,
    'component-link': LinkDemo,
    'component-share-link': ShareLinkDemo,
    'component-help-link': HelpLinkDemo,
    'component-list': ListDemo,
    'component-secure-field': SecureFieldDemo,
    'component-section': SectionDemo,
    'component-navigation-link': NavigationLinkDemo,
    'component-navigation-stack': NavigationStackDemo,
    'component-popover': PopoverDemo,
    'component-popconfirm': PopconfirmDemo,
    'component-picker': PickerDemo,
    'component-date-picker': DatePickerDemo,
    'component-color-picker': ColorPickerDemo,
    'component-gauge': GaugeDemo,
    'component-toggle': ToggleDemo,
    'component-progress-view': ProgressViewDemo,
    'component-slider': SliderDemo,
    'component-stepper': StepperDemo,
    'component-for-each': ForEachDemo,
    'component-table': TableDemo,
    'component-text-field': TextFieldDemo,
    'component-text-editor': TextEditorDemo,
    'component-form': FormDemo,
    'component-group': GroupDemo,
    'component-group-box': GroupBoxDemo,
    'component-control-group': ControlGroupDemo,
    'component-toolbar': ToolbarDemo,
    'component-vstack': VStackDemo,
    'component-lazy-vstack': LazyVStackDemo,
    'component-hstack': HStackDemo,
    'component-zstack': ZStackDemo,
    'component-grid': GridDemo,
    'component-grid-row': GridRowDemo,
    'component-spacer': SpacerDemo,
    'component-divider': DividerDemo,
    'component-scroll-view': ScrollViewDemo,
    'component-lazy-hgrid': LazyHGridDemo,
    'component-lazy-hstack': LazyHStackDemo,
    'component-lazy-vgrid': LazyVGridDemo,
    'component-color': ColorDemo,
    'component-capsule': CapsuleDemo,
    'component-circle': CircleDemo,
    'component-rectangle': RectangleDemo,
    'component-gradient': GradientDemo,
    'component-mesh-gradient': MeshGradientDemo,
    'component-canvas': CanvasDemo,
    'component-sheet': SheetDemo,
    'component-tab-view': TabViewDemo,
    'component-context-menu': ContextMenuDemo,
    'component-menu': MenuDemo,
    'component-menu-bar-extra': MenuBarExtraDemo,
    'component-commands': CommandsDemo,
    'component-disclosure-group': DisclosureGroupDemo,
    'component-rounded-rectangle': RoundedRectangleDemo,
    'component-runtime-state': RuntimeStateDemo,
    'component-outline-group': OutlineGroupDemo,
    'component-token-color': TokenColorDemo,
    'component-geometry-reader': GeometryReaderDemo,
    'component-map': MapDemo,
    'component-web-view': WebViewDemo,
    'component-timeline-view': TimelineViewDemo,
    'component-scroll-view-reader': ScrollViewReaderDemo,
    'component-window-group': WindowGroupDemo,
    'component-document-group': DocumentGroupDemo,
    'component-scene': SceneDemo,
    'component-immersive-space': ImmersiveSpaceDemo,
    'component-drop-area': DropAreaDemo,
    'component-window-accessor': WindowAccessorDemo,
    translator: TranslatorSpecDemo,
    'split-view': SplitViewDemo,
    dashboard: DashboardDemo,
    'form-sheet': FormSheetDemo,
    qq: QQDemo,
    todo: TodoDemo,
    'image-browser': ImageBrowserDemo,
    'file-browser': FileBrowserDemo,
    'system-api': SystemApiMockDemo,
  }

  const Page = pages[pageId] ?? TextDemo
  return <Page />
}
