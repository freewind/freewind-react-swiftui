import { Button, FormSection, HStack, Picker, Text, TextField, Toggle, binding, useBinding, VStack } from '../../swift'
import { todoItems } from './todoItems'

export function TodoDemo() {
  const segment = useBinding<'all' | 'open' | 'done'>('all')
  const input = useBinding('给 SwiftUI JSX demo 再加更多 case')
  const items = useBinding(todoItems)

  const visibleItems = items.value.filter(item => (segment.value === 'all' ? true : segment.value === 'done' ? item.done : !item.done))

  return (
    <FormSection title="Todo List">
      <VStack spacing={14} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
        <Picker
          selection={segment}
          pickerStyle="segmented"
          options={[
            { label: '全部', value: 'all' },
            { label: '待办', value: 'open' },
            { label: '完成', value: 'done' },
          ]}
        />
        <HStack spacing={10}>
          <TextField text={input} placeholder="new task" textFieldStyle="roundedBorder" frame={{ maxWidth: 'infinity' }} />
          <Button
            title="添加"
            buttonStyle="borderedProminent"
            onPress={() => {
              const title = input.value.trim()
              if (!title) {
                return
              }
              items.setValue([
                ...items.value,
                {
                  id: `t${String(items.value.length + 1)}`,
                  title,
                  done: false,
                  tag: 'new',
                },
              ])
              input.setValue('')
            }}
          />
        </HStack>
        <VStack spacing={8}>
          {visibleItems.map(item => (
              <HStack
                key={item.id}
                spacing={10}
                padding={12}
                frame={{ maxWidth: 'infinity', alignment: 'leading' }}
                background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 14 } }}
              >
                <Toggle
                  labelsHidden
                  isOn={binding(item.done, nextDone => {
                    items.setValue(items.value.map(prevItem => (prevItem.id === item.id ? { ...prevItem, done: nextDone } : prevItem)))
                  })}
                />
                <VStack spacing={2} alignment="leading" frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
                  <Text>{item.title}</Text>
                  <Text font="caption" foregroundStyle="secondary">
                    {item.tag}
                  </Text>
                </VStack>
                <Text font="caption" foregroundStyle={item.done ? 'green' : 'secondary'}>
                  {item.done ? 'done' : 'open'}
                </Text>
              </HStack>
            ))}
        </VStack>
      </VStack>
    </FormSection>
  )
}
