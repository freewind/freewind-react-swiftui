import type { FC } from 'react'
import {
  Divider,
  HStack,
  MockEnvironmentProvider,
  ScrollView,
  TextEditorSheet,
  type ThemeMode,
  useBinding,
  VStack,
  WindowGroup,
} from '../swiftui'
import { HomePage } from './HomePage'
import { demoPages, isDemoCategory, sectionEntries, type DemoHomeSection, type DemoSection } from './model'
import { renderDemoPage } from './renderDemoPage'
import { AppHeader } from './shared'
import { Sidebar } from './Sidebar'

export const DemoHub: FC = () => {
  const theme = useBinding<ThemeMode>('light')
  const section = useBinding<DemoHomeSection>('home')
  const currentPage = useBinding('component-text')
  const notesSheetPresented = useBinding(false)
  const notes = useBinding('这里放 demo 说明、转换 hint、组件限制。')

  const pages = isDemoCategory(section.value) ? demoPages.filter(page => page.category === section.value) : []
  const activePage = demoPages.find(page => page.id === currentPage.value) ?? demoPages[0]

  const onOpenSection = (nextSection: DemoSection) => {
    const entry = sectionEntries.find(item => item.id === nextSection)
    section.setValue(nextSection)
    currentPage.setValue(entry?.defaultPageId ?? 'component-text')
  }

  return (
    <MockEnvironmentProvider>
      <WindowGroup minWidth={1100} minHeight={760} theme={theme.value}>
        <VStack spacing={0} padding={16} frame={{ maxWidth: 'infinity', maxHeight: 'infinity', alignment: 'topLeading' }}>
          <AppHeader
            title={section.value === 'home' ? 'Demo Home' : activePage.title}
            theme={theme}
            canGoBack={section.value !== 'home'}
            onBack={() => section.setValue('home')}
          />
          <HStack frame={{ maxWidth: 'infinity', maxHeight: 'infinity', alignment: 'topLeading' }} spacing={0} padding={{ top: 16 }}>
            {section.value !== 'home' ? (
              <>
                <Sidebar
                  theme={theme}
                  section={section}
                  currentPage={currentPage}
                  pages={pages}
                  onOpenNotes={() => notesSheetPresented.setValue(true)}
                  onOpenSection={onOpenSection}
                />
                <Divider axis="vertical" />
              </>
            ) : null}
            <VStack frame={{ maxWidth: 'infinity', maxHeight: 'infinity', alignment: 'topLeading' }}>
              <ScrollView frame={{ maxWidth: 'infinity', maxHeight: 'infinity' }}>
                <VStack spacing={18} padding={{ horizontal: 20, bottom: 20 }} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
                  {section.value === 'home' ? <HomePage onOpenSection={onOpenSection} /> : renderDemoPage(currentPage.value)}
                </VStack>
              </ScrollView>
            </VStack>
          </HStack>
        </VStack>

        <TextEditorSheet title="Demo Notes" isPresented={notesSheetPresented} text={notes} />
      </WindowGroup>
    </MockEnvironmentProvider>
  )
}
