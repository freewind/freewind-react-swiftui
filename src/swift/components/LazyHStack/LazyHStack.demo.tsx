import type { FC } from 'react'
import { HStack, LazyHStack, RoundedRectangle, ScrollView, Text } from '../runtime'
import { PlaygroundSection } from '../../demo-playground'
import { ComponentPropsTable } from '../../props-table'
import {VStack} from "../VStack";
import {FormSection} from "../FormSection";

const LaneCard: FC<{ title: string; tone: 'blue' | 'green' | 'red' }> = ({ title, tone }) => {
  return (
    <RoundedRectangle fill={tone} frame={{ width: 132, height: 72 }} padding={10}>
      <Text foregroundColor="#ffffff">{title}</Text>
    </RoundedRectangle>
  )
}

export const LazyHStackDemo: FC = () => {
  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="基础横向懒加载行">
        <ScrollView
          axes="horizontal"
          frame={{ maxWidth: 'infinity' }}
          padding={12}
          background={{ fill: 'ultraThinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 16 } }}
        >
          <LazyHStack spacing={10}>
            <LaneCard title="LazyHStack" tone="blue" />
            <LaneCard title="Horizontal" tone="green" />
            <LaneCard title="Scrollable" tone="red" />
          </LazyHStack>
        </ScrollView>
      </FormSection>
      <PlaygroundSection
        title="紧凑与舒展"
        summary="展示 chip 流在不同 spacing 下的视觉密度。"
        preview={
          <VStack spacing={12} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
            <ScrollView axes="horizontal" frame={{ maxWidth: 'infinity' }} padding={10} background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 16 } }}>
              <LazyHStack spacing={6}>
                {['Dense', 'Quick', 'Compact', 'Tokens', 'Preview'].map((item, index) => (
                  <LaneCard key={item} title={item} tone={index % 2 === 0 ? 'blue' : 'green'} />
                ))}
              </LazyHStack>
            </ScrollView>
            <ScrollView axes="horizontal" frame={{ maxWidth: 'infinity' }} padding={10} background={{ fill: 'ultraThinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 16 } }}>
              <HStack spacing={0}>
                <LazyHStack spacing={16}>
                  {['Relaxed', 'Readable', 'SwiftUI', 'Compatible', 'Gallery'].map((item, index) => (
                    <LaneCard key={item} title={item} tone={index % 2 === 0 ? 'red' : 'green'} />
                  ))}
                </LazyHStack>
              </HStack>
            </ScrollView>
          </VStack>
        }
      />
      <ComponentPropsTable component="LazyHStack" />
    </VStack>
  )
}
