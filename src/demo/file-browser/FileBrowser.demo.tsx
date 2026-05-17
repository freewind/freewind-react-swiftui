import { Button, Divider, FormSection, HStack, Image, Spacer, Text, VStack } from '../../swift'
import { fileRows } from '../home/fileRows'

export function FileBrowserDemo() {
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
          <Button title="Documents" buttonStyle="borderedProminent" frame={{ maxWidth: 'infinity', alignment: 'leading' }} />
          <Button title="Downloads" buttonStyle="bordered" frame={{ maxWidth: 'infinity', alignment: 'leading' }} />
          <Button title="Pictures" buttonStyle="bordered" frame={{ maxWidth: 'infinity', alignment: 'leading' }} />
        </VStack>
        <Divider axis="vertical" />
        <VStack spacing={12} frame={{ maxWidth: 'infinity', maxHeight: 'infinity' }}>
          <HStack
            padding={14}
            frame={{ maxWidth: 'infinity' }}
            background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 18 } }}
          >
            <Text font="title3.semibold">Documents</Text>
            <Spacer />
            <Button title="New Folder" buttonStyle="bordered" />
          </HStack>
          <VStack spacing={8} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
            {fileRows.map(row => (
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
