import type { FC } from 'react'
import {
  Divider,
  MockEnvironmentProvider,
  ScrollView,
  TextEditorSheet,
  type ThemeMode,
  useBinding,
  VStack,
  WindowGroup,
  HStack,
} from '../swiftui'
import { HomePage } from './HomePage'
import { demoPages, isDemoCategory, sectionEntries, type DemoHomeSection, type DemoSection } from './model'
import { renderDemoPage } from './renderDemoPage'
import { HeroHeader } from './shared'
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
        <HStack frame={{ maxWidth: 'infinity', maxHeight: 'infinity', alignment: 'topLeading' }} spacing={0}>
          <Sidebar
            theme={theme}
            section={section}
            currentPage={currentPage}
            pages={pages}
            onOpenNotes={() => notesSheetPresented.setValue(true)}
            onOpenSection={onOpenSection}
          />
          {section.value !== 'home' ? <Divider axis="vertical" /> : null}
          <VStack frame={{ maxWidth: 'infinity', maxHeight: 'infinity', alignment: 'topLeading' }}>
            <ScrollView frame={{ maxWidth: 'infinity', maxHeight: 'infinity' }}>
              <VStack spacing={18} padding={20} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
                {section.value === 'home' ? (
                  <HomePage theme={theme} onOpenSection={onOpenSection} />
                ) : (
                  <>
                    <HeroHeader activePage={activePage.title} />
                    {renderDemoPage(currentPage.value)}
                  </>
                )}
              </VStack>
            </ScrollView>
          </VStack>
        </HStack>

        <TextEditorSheet title="Demo Notes" isPresented={notesSheetPresented} text={notes} />
      </WindowGroup>
    </MockEnvironmentProvider>
  )
}
