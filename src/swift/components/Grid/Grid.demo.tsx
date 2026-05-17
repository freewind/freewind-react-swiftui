import type { FC } from 'react'
import { LazyHGrid } from '../LazyHGrid/LazyHGrid'
import { Grid } from './Grid'
import { GridRow } from '../GridRow/GridRow'
import { RoundedRectangle, Text } from '../runtime'
import { VStack } from '../VStack'
import {FormSection} from "../FormSection";

const Cell: FC<{ title: string }> = ({ title }) => {
  return (
    <RoundedRectangle fill="thinMaterial" frame={{ height: 72, maxWidth: 'infinity' }} padding={12}>
      <Text>{title}</Text>
    </RoundedRectangle>
  )
}

export const GridDemo: FC = () => {
  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="Grid / LazyHGrid">
        <VStack spacing={16}>
          <Grid columns={3} spacing={10}>
            <GridRow><Cell title="A1" /></GridRow>
            <GridRow><Cell title="A2" /></GridRow>
            <GridRow><Cell title="A3" /></GridRow>
            <GridRow><Cell title="B1" /></GridRow>
            <GridRow><Cell title="B2" /></GridRow>
            <GridRow><Cell title="B3" /></GridRow>
          </Grid>
          <LazyHGrid rows={2} spacing={10}>
            {Array.from({ length: 8 }).map((_, index) => (
              <Cell key={index} title={`item ${String(index + 1)}`} />
            ))}
          </LazyHGrid>
        </VStack>
      </FormSection>
    </VStack>
  )
}
