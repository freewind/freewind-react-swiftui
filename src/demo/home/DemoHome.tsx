import type { FC } from 'react'
import {
  Button,
  Divider,
  HStack,
  MockEnvironmentProvider,
  ScrollView,
  Text,
  TextEditorSheet,
  type ThemeMode,
  useBinding,
  VStack,
  WindowGroup,
} from '../../swift'
import { HomePage } from './HomePage'
import { demoPages, isDemoCategory, sectionEntries, type DemoHomeSection, type DemoSection } from './model'
import { renderDemoPage } from './renderDemoPage'
import { AppHeader } from './shared'

export const DemoHome: FC = () => {
  const theme = useBinding<ThemeMode>('light')
  const section = useBinding<DemoHomeSection>('home')
  const currentPage = useBinding('component-text')
  const notesSheetPresented = useBinding(false)
  const notes = useBinding('这里放 demo 说明、转换 hint、组件限制。')

  const pages = isDemoCategory(section.value) ? demoPages.filter(page => page.category === section.value) : []
  const activePage = demoPages.find(page => page.id === currentPage.value)
  const activeSection = sectionEntries.find(entry => entry.id === section.value)
  const showSidebar = isDemoCategory(section.value)

  const onOpenSection = (nextSection: DemoSection) => {
    const entry = sectionEntries.find(item => item.id === nextSection)
    section.setValue(nextSection)
    currentPage.setValue(entry?.defaultPageId ?? 'component-text')
  }

  return (
    <MockEnvironmentProvider>
      <WindowGroup
        minWidth={1100}
        minHeight={760}
        windowMode="maximized"
        theme={theme.value}
        title={activePage?.title ?? activeSection?.title ?? 'Demo Home'}
        subtitle="SwiftUI Preview Window"
        contentScrollAxes="vertical"
        contentShowsIndicators
      >
        <VStack spacing={0} padding={16} frame={{ maxWidth: 'infinity', maxHeight: 'infinity', alignment: 'topLeading' }}>
          <AppHeader
            title={section.value === 'home' ? 'Demo Home' : activePage?.title ?? activeSection?.title ?? 'Demo'}
            theme={theme}
            canGoBack={section.value !== 'home'}
            onBack={() => section.setValue('home')}
          />
          <HStack frame={{ maxWidth: 'infinity', maxHeight: 'infinity', alignment: 'topLeading' }} spacing={0} padding={{ top: 16 }}>
            {showSidebar ? (
              <>
                <Sidebar
                  section={section}
                  currentPage={currentPage}
                  pages={pages}
                  onOpenNotes={() => notesSheetPresented.setValue(true)}
                />
                <Divider axis="vertical" />
              </>
            ) : null}
            <VStack frame={{ maxWidth: 'infinity', maxHeight: 'infinity', alignment: 'topLeading' }}>
              <VStack spacing={18} padding={{ top: 12, horizontal: 20, bottom: 20 }} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
                {section.value === 'home' ? <HomePage onOpenSection={onOpenSection} /> : renderDemoPage(currentPage.value)}
              </VStack>
            </VStack>
          </HStack>
        </VStack>

        <TextEditorSheet title="Demo Notes" isPresented={notesSheetPresented} text={notes} />
      </WindowGroup>
    </MockEnvironmentProvider>
  )
}

const Sidebar: FC<{
  section: ReturnType<typeof useBinding<DemoHomeSection>>
  currentPage: ReturnType<typeof useBinding<string>>
  pages: Array<{ id: string; title: string }>
  onOpenNotes: () => void
}> = ({ currentPage, pages, onOpenNotes }) => {
  return (
    <VStack
      spacing={10}
      padding={12}
      frame={{ width: 240, maxHeight: 'infinity', alignment: 'topLeading' }}
      background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 18 } }}
    >
      <Text font="headline">Pages</Text>
      <ScrollView frame={{ maxWidth: 'infinity', maxHeight: 'infinity' }} showsIndicators>
        <VStack spacing={8} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
          {pages.map(page => (
            <Button
              key={page.id}
              title={page.title}
              buttonStyle={currentPage.value === page.id ? 'borderedProminent' : 'bordered'}
              frame={{ maxWidth: 'infinity', alignment: 'leading' }}
              onPress={() => currentPage.setValue(page.id)}
            />
          ))}
        </VStack>
      </ScrollView>
      <Button title="Notes" buttonStyle="bordered" frame={{ maxWidth: 'infinity', alignment: 'leading' }} onPress={onOpenNotes} />
    </VStack>
  )
}
