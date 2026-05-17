import type { FC } from 'react'
import { DocumentGroup } from './DocumentGroup'
import { Button, HStack, Text, TextField, useAppStorage, useMockEnvironment, useMockFileDocument } from '../runtime'
import { VStack } from '../VStack'
import { FormSection } from '../FormSection'
import { parentPath } from '../../../mock-system/fileTree/parentPath'

export const DocumentGroupDemo: FC = () => {
  const env = useMockEnvironment()
  const document = useMockFileDocument('/Downloads/mock-note.txt')
  const nextName = useAppStorage('document-group:rename', document?.fileName ?? 'mock-note.txt')

  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="DocumentGroup">
        <DocumentGroup
          document={document ?? undefined}
          onOpenDocument={opened => {
            env.fileApi.revealPath(opened.path)
          }}
        >
          <VStack spacing={10} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
            <Text>Document scoped workspace shell.</Text>
            {document ? (
              <>
                <TextField text={nextName} placeholder="rename file" textFieldStyle="roundedBorder" />
                <HStack spacing={10}>
                  <Button
                    title="Rename"
                    buttonStyle="borderedProminent"
                    onPress={() => env.renamePath(document.path, nextName.value)}
                  />
                  <Button title="Reveal" buttonStyle="bordered" onPress={() => env.fileApi.revealPath(document.path)} />
                  <Button title="Open Folder" buttonStyle="bordered" onPress={() => env.fileApi.revealPath(parentPath(document.path))} />
                  <Button title="Delete" buttonStyle="bordered" onPress={() => env.removePath(document.path)} />
                </HStack>
              </>
            ) : (
              <Button
                title="Recreate"
                buttonStyle="borderedProminent"
                onPress={() =>
                  env.createFile('/Downloads', {
                    fileName: nextName.value,
                    kind: 'file',
                    mimeType: 'text/plain',
                    data: 'mock file recreated',
                  })
                }
              />
            )}
          </VStack>
        </DocumentGroup>
      </FormSection>
    </VStack>
  )
}
