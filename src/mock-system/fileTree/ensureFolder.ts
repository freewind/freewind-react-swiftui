import type { Dispatch, SetStateAction } from 'react'
import type { MockFileNode } from '../types'
import { parentPath } from './parentPath'
import { updateNode } from './updateNode'
import { findNode } from './findNode'

export const ensureFolder = (path: string, setFiles: Dispatch<SetStateAction<MockFileNode[]>>) => {
  setFiles(prev => {
    if (findNode(prev, path)) {
      return prev
    }
    const parts = path.split('/').filter(Boolean)
    let next = prev
    let currentPath = ''
    for (const part of parts) {
      currentPath = `${currentPath}/${part}`
      if (!findNode(next, currentPath)) {
        const parent = parentPath(currentPath)
        if (parent === '/') {
          next = [
            ...next,
            { path: currentPath, fileName: part, kind: 'folder', mimeType: 'inode/directory', data: '', children: [] },
          ]
        } else {
          next = updateNode(next, parent, folder => ({
            ...folder,
            children: [
              ...(folder.children ?? []),
              { path: currentPath, fileName: part, kind: 'folder', mimeType: 'inode/directory', data: '', children: [] },
            ],
          }))
        }
      }
    }
    return next
  })
}
