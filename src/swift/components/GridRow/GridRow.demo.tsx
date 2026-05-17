import type { FC } from 'react'
import { Grid } from '../Grid/Grid'
import { GridRow } from './GridRow'
import { RoundedRectangle, Text } from '../runtime'
import { VStack } from '../VStack'
import {FormSection} from "../FormSection";

const Cell: FC<{ title: string }> = ({ title }) => (
  <RoundedRectangle fill="thinMaterial" frame={{ height: 64, maxWidth: 'infinity' }} padding={10}>
    <Text>{title}</Text>
  </RoundedRectangle>
)

export const GridRowDemo: FC = () => {
  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="GridRow">
        <Grid columns={3} spacing={10}>
          <GridRow><Cell title="Row 1-A" /></GridRow>
          <GridRow><Cell title="Row 1-B" /></GridRow>
          <GridRow><Cell title="Row 1-C" /></GridRow>
        </Grid>
      </FormSection>
    </VStack>
  )
}
