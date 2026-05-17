import type { FC } from 'react'
import { FormSection, HStack, Text } from '../../swift'

export const EmojiDemo: FC = () => {
  return (
    <FormSection title="Emoji 选择器">
      <HStack spacing={12}>
        <Text font="title">😀 😎 🛰️ 🧩 📦</Text>
      </HStack>
    </FormSection>
  )
}
