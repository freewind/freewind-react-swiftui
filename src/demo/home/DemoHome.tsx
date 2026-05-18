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
import { demoPages, groupPagesByCategory, isDemoCategory, sectionEntries, type DemoHomeSection, type DemoSection } from './model'
import { renderDemoPage } from './renderDemoPage'
import { AppHeader, ButtonCard } from './shared'

export const DemoHome: FC = () => {
  const theme = useBinding<ThemeMode>('light')
  const section = useBinding<DemoHomeSection>('home')
  const currentPage = useBinding<string | null>(null)
  const notesSheetPresented = useBinding(false)
  const notes = useBinding('这里放 demo 说明、转换 hint、组件限制。')

  const pages = isDemoCategory(section.value) ? demoPages.filter(page => page.category === section.value) : []
  const pageGroups = isDemoCategory(section.value) ? groupPagesByCategory(pages, section.value) : []
  const activePage = demoPages.find(page => page.id === currentPage.value)
  const activeSection = sectionEntries.find(entry => entry.id === section.value)
  const showSidebar = isDemoCategory(section.value)

  const onOpenSection = (nextSection: DemoSection) => {
    const entry = sectionEntries.find(item => item.id === nextSection)
    section.setValue(nextSection)
    currentPage.setValue(isDemoCategory(nextSection) ? null : entry?.defaultPageId ?? null)
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
        <VStack spacing={0} alignment="leading" padding={16} frame={{ width:'infinity', maxWidth: 'infinity', maxHeight: 'infinity' }}>
          <AppHeader
            title={section.value === 'home' ? 'Demo Home' : activePage?.title ?? activeSection?.title ?? 'Demo'}
            theme={theme}
            canGoBack={section.value !== 'home'}
            onBack={() => {
              section.setValue('home')
              currentPage.setValue(null)
            }}
          />
          <HStack frame={{ maxWidth: 'infinity', maxHeight: 'infinity', alignment: 'topLeading' }} spacing={0} padding={{ top: 16 }}>
            {showSidebar ? (
              <>
                <Sidebar
                  section={section}
                  currentPage={currentPage}
                  groups={pageGroups}
                  onOpenNotes={() => notesSheetPresented.setValue(true)}
                />
                <Divider axis="vertical" />
              </>
            ) : null}
            <VStack frame={{ maxWidth: 'infinity', maxHeight: 'infinity', alignment: 'topLeading' }}>
              <VStack spacing={18} padding={{ top: 12, horizontal: 20, bottom: 20 }} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
                {section.value === 'home' ? (
                  <HomePage onOpenSection={onOpenSection} />
                ) : showSidebar && !currentPage.value ? (
                  <SectionLanding groups={pageGroups} onOpenPage={pageId => currentPage.setValue(pageId)} />
                ) : currentPage.value ? (
                  renderDemoPage(currentPage.value)
                ) : null}
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
  currentPage: ReturnType<typeof useBinding<string | null>>
  groups: Array<{ title: string; pages: Array<{ id: string; title: string }> }>
  onOpenNotes: () => void
}> = ({ section, currentPage, groups, onOpenNotes }) => {
  const scrollIdentity = `${section.value}:${groups.map(group => `${group.title}:${group.pages.map(page => page.id).join(',')}`).join('|')}`

  return (
    <VStack
      spacing={10}
      padding={12}
      frame={{ width: 240, maxHeight: 'infinity', alignment: 'topLeading' }}
      background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 18 } }}
    >
      <Text font="headline">Pages</Text>
      <ScrollView key={scrollIdentity} frame={{ maxWidth: 'infinity', maxHeight: 'infinity' }} showsIndicators>
        <VStack spacing={8} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
          {groups.map(group => (
            <VStack key={group.title || 'default'} spacing={8} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
              {group.title ? <Text font="caption.semibold" foregroundStyle="secondary">{group.title}</Text> : null}
              <VStack spacing={8} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
                {group.pages.map(page => (
                  <Button
                    key={page.id}
                    title={page.title}
                    buttonStyle={currentPage.value === page.id ? 'borderedProminent' : currentPage.value === null ? 'plain' : 'bordered'}
                    frame={{ maxWidth: 'infinity', alignment: 'leading' }}
                    onPress={() => currentPage.setValue(page.id)}
                  />
                ))}
              </VStack>
            </VStack>
          ))}
        </VStack>
      </ScrollView>
      <Button title="Notes" buttonStyle="bordered" frame={{ maxWidth: 'infinity', alignment: 'leading' }} onPress={onOpenNotes} />
    </VStack>
  )
}

const SectionLanding: FC<{
  groups: Array<{ title: string; pages: Array<{ id: string; title: string }> }>
  onOpenPage: (pageId: string) => void
}> = ({ groups, onOpenPage }) => {
  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <Text font="title3.semibold">选择页面</Text>
      {groups.map(group => (
        <VStack key={group.title || 'default'} spacing={12} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
          {group.title ? <Text font="headline">{group.title}</Text> : null}
          <VStack spacing={12} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
            {group.pages.map(page => (
              <ButtonCard
                key={page.id}
                title={page.title}
                summary="进入该组件/页面 demo。"
                buttonTitle="打开"
                onPress={() => onOpenPage(page.id)}
              />
            ))}
          </VStack>
        </VStack>
      ))}
    </VStack>
  )
}
