import type { FC } from 'react'
import {
  Button,
  EnvironmentObjectProvider,
  FocusedValuesProvider,
  Text,
  useEnvironmentObject,
  useEnvironmentObjectKey,
  useFocusedValue,
  useObservedObject,
  useStateObject,
  VStack,
} from '../runtime'
import { FormSection } from '../FormSection'

const FocusEcho: FC = () => {
  const value = useFocusedValue<string>('runtime-panel')
  return (
    <Text font="caption" foregroundStyle="secondary">
      focused value: {value ?? 'none'}
    </Text>
  )
}

const CounterPanel: FC<{
  title: string
  count: number
  onStep: () => void
}> = ({ title, count, onStep }) => {
  return (
    <VStack
      spacing={8}
      padding={12}
      frame={{ maxWidth: 'infinity', alignment: 'leading' }}
      background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 14 } }}
    >
      <Text font="headline">{title}</Text>
      <Text>{String(count)}</Text>
      <Button title="Step" buttonStyle="borderedProminent" onPress={onStep} />
    </VStack>
  )
}

const EnvironmentCounterPanel: FC = () => {
  const environmentObject = useEnvironmentObjectKey<{ count: number }>('runtime-counter')

  return (
    <CounterPanel
      title="EnvironmentObject"
      count={environmentObject.value.count}
      onStep={() => environmentObject.setValue(prev => ({ ...prev, count: prev.count + 1 }))}
    />
  )
}

export const RuntimeStateDemo: FC = () => {
  const stateObject = useStateObject({ count: 1 })
  const observedObject = useObservedObject({ count: 5 })
  const environmentObject = useEnvironmentObject({ count: 9 })

  return (
    <EnvironmentObjectProvider name="runtime-counter" object={environmentObject}>
      <FocusedValuesProvider values={{ 'runtime-panel': 'state-objects' }}>
        <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
          <FormSection title="DynamicProperty Runtime">
            <VStack spacing={12} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
              <CounterPanel
                title="StateObject"
                count={stateObject.value.count}
                onStep={() => stateObject.setValue(prev => ({ ...prev, count: prev.count + 1 }))}
              />
              <CounterPanel
                title="ObservedObject"
                count={observedObject.value.count}
                onStep={() => observedObject.setValue(prev => ({ ...prev, count: prev.count + 1 }))}
              />
              <EnvironmentCounterPanel />
              <Text font="caption" foregroundStyle="secondary">
                default environment count: {String(environmentObject.value.count)}
              </Text>
              <FocusEcho />
            </VStack>
          </FormSection>
        </VStack>
      </FocusedValuesProvider>
    </EnvironmentObjectProvider>
  )
}
