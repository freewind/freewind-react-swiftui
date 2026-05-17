import type { FC } from 'react'
import { Button, FormSection, HStack, VStack } from '../swiftui'
import { GalleryRow, MetricCard } from './shared'

export const DashboardDemo: FC = () => {
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
