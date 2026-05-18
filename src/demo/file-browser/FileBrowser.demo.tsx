import { Button, Divider, FormSection, HStack, Image, Spacer, Text, VStack, useBinding } from '../../swift'

type FolderId = 'documents' | 'downloads' | 'pictures'

const folders: Array<{
  id: FolderId
  title: string
  rows: Array<{ id: string; name: string; kind: 'folder' | 'file' | 'image'; meta: string }>
}> = [
  {
    id: 'documents',
    title: 'Documents',
    rows: [
      { id: 'd-1', name: 'Product Brief.md', kind: 'file', meta: '18 KB' },
      { id: 'd-2', name: 'Meeting Notes', kind: 'folder', meta: '6 items' },
      { id: 'd-3', name: 'Roadmap.pdf', kind: 'file', meta: '2.4 MB' },
      { id: 'd-4', name: 'Sprint Review.pages', kind: 'file', meta: '840 KB' },
    ],
  },
  {
    id: 'downloads',
    title: 'Downloads',
    rows: [
      { id: 'dl-1', name: 'archive.zip', kind: 'file', meta: '88 MB' },
      { id: 'dl-2', name: 'preview.png', kind: 'image', meta: '1.2 MB' },
      { id: 'dl-3', name: 'release-notes.txt', kind: 'file', meta: '9 KB' },
      { id: 'dl-4', name: 'Packages', kind: 'folder', meta: '3 items' },
    ],
  },
  {
    id: 'pictures',
    title: 'Pictures',
    rows: [
      { id: 'p-1', name: 'Vacation', kind: 'folder', meta: '24 items' },
      { id: 'p-2', name: 'sunrise.png', kind: 'image', meta: '4.8 MB' },
      { id: 'p-3', name: 'portrait.heic', kind: 'image', meta: '3.1 MB' },
      { id: 'p-4', name: 'Moodboard', kind: 'folder', meta: '12 items' },
    ],
  },
]

export function FileBrowserDemo() {
  const selection = useBinding<FolderId>('documents')
  const selectedFolder = folders.find(folder => folder.id === selection.value) ?? folders[0]

  return (
    <FormSection title="File Browser">
      <HStack spacing={0} frame={{ maxWidth: 'infinity', minHeight: 420 }}>
        <VStack
          spacing={8}
          padding={14}
          frame={{ width: 220, maxHeight: 'infinity', alignment: 'leading' }}
          background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 18 } }}
        >
          <Text font="headline">Favorites</Text>
          {folders.map(folder => (
            <Button
              key={folder.id}
              title={folder.title}
              buttonStyle={selection.value === folder.id ? 'borderedProminent' : 'bordered'}
              frame={{ maxWidth: 'infinity', alignment: 'leading' }}
              onPress={() => selection.setValue(folder.id)}
            />
          ))}
        </VStack>
        <Divider axis="vertical" />
        <VStack spacing={12} frame={{ maxWidth: 'infinity', maxHeight: 'infinity' }}>
          <HStack
            padding={14}
            frame={{ maxWidth: 'infinity' }}
            background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 18 } }}
          >
            <Text font="title3.semibold">{selectedFolder.title}</Text>
            <Spacer />
            <Button title="New Folder" buttonStyle="bordered" />
          </HStack>
          <VStack spacing={8} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
            {selectedFolder.rows.map(row => (
              <HStack
                key={row.id}
                spacing={10}
                padding={12}
                frame={{ maxWidth: 'infinity', alignment: 'leading' }}
                background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 14 } }}
              >
                <Image systemName={row.kind === 'folder' ? 'doc' : row.kind === 'image' ? 'photo' : 'doc'} />
                <VStack spacing={2} alignment="leading" frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
                  <Text>{row.name}</Text>
                  <Text font="caption" foregroundStyle="secondary">
                    {row.meta}
                  </Text>
                </VStack>
              </HStack>
            ))}
          </VStack>
        </VStack>
      </HStack>
    </FormSection>
  )
}
