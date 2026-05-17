import type { FC } from 'react'
import { Text, useBinding, VStack, type FontToken, type ForegroundStyleToken, type TextAlign } from './runtime'
import { FormSection } from './controls'
import { BoolField, EnumField, PlaygroundSection, StringField, toBoolBinding, useBoolBinding } from './demo-playground'
import { fontOptions, foregroundOptions } from './demo-shared'

export const TextDemo: FC = () => {
  const content = useBinding('SwiftUI-shaped JSX text preview')
  const font = useBinding<FontToken>('title2')
  const foreground = useBinding<ForegroundStyleToken>('accentColor')
  const align = useBinding<TextAlign>('leading')
  const italic = useBoolBinding(false)
  const mono = useBoolBinding(false)
  const selectable = useBoolBinding(true)

  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="静态例子">
        <VStack spacing={8} alignment="leading" frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
          <Text font="largeTitle">largeTitle</Text>
          <Text font="title">title</Text>
          <Text font="title2">title2</Text>
          <Text font="title3.semibold">title3.semibold</Text>
          <Text font="headline">headline</Text>
          <Text font="body">body</Text>
          <Text font="caption" foregroundStyle="secondary">caption secondary</Text>
          <Text font="caption2.monospaced" textSelection="enabled">caption2.monospaced selectable</Text>
        </VStack>
      </FormSection>

      <PlaygroundSection
        title="Text Playground"
        preview={
          <Text
            font={font.value}
            foregroundStyle={foreground.value}
            italic={toBoolBinding(italic)}
            monospaced={toBoolBinding(mono)}
            textSelection={toBoolBinding(selectable) ? 'enabled' : 'disabled'}
            multilineTextAlignment={align.value}
            frame={{ maxWidth: 'infinity' }}
          >
            {content.value}
          </Text>
        }
        form={
          <>
            <StringField label="children" binding={content} />
            <EnumField label="font" binding={font} options={fontOptions} />
            <EnumField label="foregroundStyle" binding={foreground} options={foregroundOptions} />
            <EnumField
              label="multilineTextAlignment"
              binding={align}
              options={[
                { label: 'leading', value: 'leading' },
                { label: 'center', value: 'center' },
                { label: 'trailing', value: 'trailing' },
              ]}
            />
            <BoolField label="italic" binding={italic} />
            <BoolField label="monospaced" binding={mono} />
            <BoolField label="textSelection" binding={selectable} />
          </>
        }
      />
    </VStack>
  )
}
