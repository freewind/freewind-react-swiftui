import type { FC } from 'react'
import { DocumentGroup } from './DocumentGroup'
import { Button, DocumentWorkspaceProvider, GroupBox, HStack, ScrollView, Text, TextField, fileDocument, useAppStorage, useDocumentAction, useDocumentWorkspace, useMockEnvironment, useMockFileDocument } from '../runtime'
import { VStack } from '../VStack'
import { FormSection } from '../FormSection'
import { parentPath } from '../../../mock-system/fileTree/parentPath'
import { buildSwiftUiDraft, buildTranslatorExportPacket } from '../../../translator'

export const DocumentGroupDemo: FC = () => {
  return (
    <DocumentWorkspaceProvider>
      <DocumentGroupDemoInner />
    </DocumentWorkspaceProvider>
  )
}

const DocumentGroupDemoInner: FC = () => {
  const env = useMockEnvironment()
  const documentWorkspace = useDocumentWorkspace()
  const documentAction = useDocumentAction()
  const primaryDocument = useMockFileDocument('/Downloads/mock-note.txt')
  const briefDocument = useMockFileDocument('/Downloads/peer-mac/files/brief.md')
  const nextName = useAppStorage('document-group:rename', primaryDocument?.fileName ?? 'mock-note.txt')
  const selection = useAppStorage<string | null>('document-group:selection', primaryDocument?.id ?? briefDocument?.id ?? null)
  const saveStatus = useAppStorage('document-group:save-status', 'idle')
  const packet = buildTranslatorExportPacket('native-swift-composer-text-view')
  const draft = buildSwiftUiDraft(packet)
  const documents = [primaryDocument, briefDocument].filter(Boolean).map(item => item!)
  const selectedDocument = documents.find(item => item.id === selection.value) ?? documents[0] ?? null

  const createDocument = () => {
    env.createFile('/Downloads', {
      fileName: nextName.value,
      kind: 'file',
      mimeType: 'text/plain',
      data: 'mock file recreated',
    })
  }

  const saveDocument = (path: string) => {
    const current = env.fileApi.documentByPath(path)
    if (!current) {
      saveStatus.setValue('missing')
      return
    }
    env.removePath(path)
    env.createFile(parentPath(path), {
      fileName: current.fileName,
      kind: current.kind,
      mimeType: current.mimeType,
      data: `${current.data}\n# saved at ${new Date().toLocaleTimeString()}`,
    })
    const saved = env.fileApi.documentByPath(path)
    selection.setValue(saved?.path ?? path)
    saveStatus.setValue(saved ? `saved ${saved.fileName}` : 'saved')
  }

  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="DocumentGroup">
        <DocumentGroup
          document={selectedDocument ?? undefined}
          documents={documents}
          selection={selection}
          onCreateDocument={createDocument}
          onOpenDocument={opened => {
            documentAction.openDocument(opened.id)
            env.fileApi.revealPath(opened.path)
          }}
          onSaveDocument={saved => {
            documentAction.saveDocument(saved.id)
            saveDocument(saved.path)
          }}
        >
          <VStack spacing={10} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
            <Text>Document scoped workspace shell.</Text>
            <Text font="caption" foregroundStyle="secondary">
              status: {saveStatus.value}
            </Text>
            {selectedDocument ? (
              <>
                <TextField text={nextName} placeholder="rename file" textFieldStyle="roundedBorder" />
                <HStack spacing={10}>
                  <Button
                    title="Rename"
                    buttonStyle="borderedProminent"
                    onPress={() => {
                      env.renamePath(selectedDocument.path, nextName.value)
                      const renamed = fileDocument({
                        fileName: nextName.value,
                        path: `${parentPath(selectedDocument.path)}/${nextName.value}`,
                        mimeType: selectedDocument.mimeType,
                        data: selectedDocument.data,
                      })
                      selection.setValue(renamed.id)
                    }}
                  />
                  <Button title="Reveal" buttonStyle="bordered" onPress={() => env.fileApi.revealPath(selectedDocument.path)} />
                  <Button
                    title="Open Folder"
                    buttonStyle="bordered"
                    onPress={() => env.fileApi.revealPath(parentPath(selectedDocument.path))}
                  />
                  <Button title="Delete" buttonStyle="bordered" onPress={() => env.removePath(selectedDocument.path)} />
                  <Button
                    title="Close"
                    buttonStyle="plain"
                    onPress={() => {
                      documentAction.closeDocument(selectedDocument.id)
                      selection.setValue(null)
                    }}
                  />
                </HStack>
              </>
            ) : (
              <Button title="Recreate" buttonStyle="borderedProminent" onPress={createDocument} />
            )}
          </VStack>
        </DocumentGroup>
      </FormSection>
      <Text font="caption2.monospaced" foregroundStyle="secondary">
        {JSON.stringify(documentWorkspace.value)}
      </Text>
      <HStack spacing={12} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
        <GroupBox title="Export Packet" frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
          <ScrollView axes={['horizontal', 'vertical']} frame={{ maxWidth: 'infinity', height: 220 }} padding={12}>
            <Text monospaced textSelection="enabled" font="caption2.monospaced">
              {JSON.stringify(packet, null, 2)}
            </Text>
          </ScrollView>
        </GroupBox>
        <GroupBox title="SwiftUI Draft" frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
          <ScrollView axes={['horizontal', 'vertical']} frame={{ maxWidth: 'infinity', height: 220 }} padding={12}>
            <Text monospaced textSelection="enabled" font="caption2.monospaced">
              {draft}
            </Text>
          </ScrollView>
        </GroupBox>
      </HStack>
    </VStack>
  )
}
