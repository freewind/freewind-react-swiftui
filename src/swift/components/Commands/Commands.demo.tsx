import type { FC } from 'react'
import { Commands } from './Commands'
import { Button } from '../Button'
import { SceneLifecycleProvider, Text, useCommandAction, useMockEnvironment, useSceneLifecycle, useWindowAction } from '../runtime'
import { VStack } from '../VStack'
import { FormSection } from '../FormSection'

export const CommandsDemo: FC = () => {
  return (
    <SceneLifecycleProvider>
      <CommandsDemoInner />
    </SceneLifecycleProvider>
  )
}

const CommandsDemoInner: FC = () => {
  const lifecycle = useSceneLifecycle()
  const env = useMockEnvironment()
  const windowAction = useWindowAction()
  const runCommand = useCommandAction()
  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="Commands">
        <Commands id="file-menu" title="File">
          <Button
            title="New Window"
            buttonStyle="plain"
            frame={{ maxWidth: 'infinity', alignment: 'leading' }}
            onPress={() => {
              runCommand('file-menu', 'New Window')
              windowAction.openWindow({
                id: `command-window-${Date.now()}`,
                title: 'Command Window',
                isKeyWindow: false,
                defaultWidth: 480,
                defaultHeight: 320,
              })
              env.systemApi.openUrl('command://new-window')
            }}
          />
          <Button
            title="Close"
            buttonStyle="plain"
            frame={{ maxWidth: 'infinity', alignment: 'leading' }}
            onPress={() => {
              runCommand('file-menu', 'Close')
              const lastWindow = lifecycle.value.windows[lifecycle.value.windows.length - 1]
              if (lastWindow) {
                windowAction.closeWindow(lastWindow.id)
              }
              env.systemApi.openUrl('command://close-window')
            }}
          />
        </Commands>
        <Commands id="edit-menu" title="Edit">
          <Button
            title="Undo"
            buttonStyle="plain"
            frame={{ maxWidth: 'infinity', alignment: 'leading' }}
            onPress={() => runCommand('edit-menu', 'Undo')}
          />
          <Button
            title="Redo"
            buttonStyle="plain"
            frame={{ maxWidth: 'infinity', alignment: 'leading' }}
            onPress={() => runCommand('edit-menu', 'Redo')}
          />
          <Text font="caption" foregroundStyle="secondary">
            command menu stub
          </Text>
        </Commands>
        <Text font="caption2.monospaced" foregroundStyle="tertiary">
          {JSON.stringify(lifecycle.value.commands)}
        </Text>
      </FormSection>
    </VStack>
  )
}
