import type { FC } from 'react'
import { Button, Divider, FormSection, HStack, Spacer, Text, TextEditor, TextFieldRow, Sheet, useBinding, VStack } from '../swiftui'
import { GalleryRow, MetricCard } from './shared'

export const SplitViewLayouts: FC = () => {
  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="Classic Split View">
        <HStack spacing={0} frame={{ maxWidth: 'infinity', minHeight: 380 }}>
          <VStack
            spacing={8}
            padding={14}
            frame={{ width: 240, maxHeight: 'infinity', alignment: 'leading' }}
            background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 18 } }}
          >
            <Text font="headline">Sidebar</Text>
            <Button title="Inbox" buttonStyle="borderedProminent" frame={{ maxWidth: 'infinity', alignment: 'leading' }} />
            <Button title="Archive" buttonStyle="bordered" frame={{ maxWidth: 'infinity', alignment: 'leading' }} />
            <Button title="Drafts" buttonStyle="bordered" frame={{ maxWidth: 'infinity', alignment: 'leading' }} />
          </VStack>
          <Divider axis="vertical" />
          <VStack
            spacing={12}
            padding={18}
            frame={{ maxWidth: 'infinity', maxHeight: 'infinity', alignment: 'leading' }}
            background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 18 } }}
          >
            <Text font="title3.semibold">Detail Panel</Text>
            <Text foregroundStyle="secondary">
              常见三段：toolbar / content / footer。适合 mail、chat、file browser。
            </Text>
            <Spacer />
            <HStack>
              <Button title="Cancel" buttonStyle="bordered" />
              <Button title="Save" buttonStyle="borderedProminent" />
            </HStack>
          </VStack>
        </HStack>
      </FormSection>
    </VStack>
  )
}

export const DashboardLayouts: FC = () => {
  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="Dashboard Cards">
        <VStack spacing={14} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
          <HStack spacing={14} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
            <MetricCard title="Messages" value="1,204" meta="+12 today" tone="blue" />
            <MetricCard title="Devices" value="14" meta="3 online" tone="green" />
            <MetricCard title="Images" value="298" meta="18 new" tone="red" />
          </HStack>
          <HStack spacing={14} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
            <FormSection title="Activity">
              <VStack spacing={8} alignment="leading">
                <GalleryRow title="sync peers" meta="09:14" />
                <GalleryRow title="save image" meta="09:21" />
                <GalleryRow title="revoke message" meta="09:36" />
              </VStack>
            </FormSection>
            <FormSection title="Quick Actions">
              <VStack spacing={10} alignment="leading">
                <Button title="Scan LAN" buttonStyle="borderedProminent" />
                <Button title="Open Downloads" buttonStyle="bordered" />
                <Button title="Rebuild Cache" buttonStyle="bordered" />
              </VStack>
            </FormSection>
          </HStack>
        </VStack>
      </FormSection>
    </VStack>
  )
}

export const FormAndSheetLayouts: FC = () => {
  const profileName = useBinding('freewind')
  const profileBio = useBinding('喜欢先用 React 热更调 SwiftUI UI。')
  const sheetPresented = useBinding(false)

  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="Form Layout">
        <VStack spacing={12} alignment="leading" frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
          <TextFieldRow label="username" text={profileName} placeholder="freewind" />
          <VStack spacing={6} alignment="leading" frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
            <Text font="caption" foregroundStyle="secondary">
              bio
            </Text>
            <TextEditor text={profileBio} frame={{ height: 120, maxWidth: 'infinity' }} />
          </VStack>
          <HStack>
            <Spacer />
            <Button title="Preview Sheet" buttonStyle="borderedProminent" onPress={() => sheetPresented.setValue(true)} />
          </HStack>
        </VStack>
      </FormSection>

      <Sheet isPresented={sheetPresented}>
        <VStack
          spacing={14}
          padding={20}
          frame={{ width: 420, height: 250 }}
          background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 20 } }}
        >
          <Text font="headline">Profile Preview</Text>
          <Text>{profileName.value}</Text>
          <Text foregroundStyle="secondary">{profileBio.value}</Text>
          <HStack>
            <Spacer />
            <Button title="Done" buttonStyle="borderedProminent" onPress={() => sheetPresented.setValue(false)} />
          </HStack>
        </VStack>
      </Sheet>
    </VStack>
  )
}
