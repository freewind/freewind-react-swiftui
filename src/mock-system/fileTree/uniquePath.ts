import type { MockFileNode } from '../types'
import { joinPath } from './joinPath'
import { parentPath } from './parentPath'

export const uniquePath = (siblings: MockFileNode[], targetPath: string, fileName: string) => {
  if (!siblings.some(node => node.path === targetPath)) {
    return targetPath
  }
  const dot = fileName.lastIndexOf('.')
  const base = dot >= 0 ? fileName.slice(0, dot) : fileName
  const ext = dot >= 0 ? fileName.slice(dot) : ''
  let index = 1
  while (true) {
    const nextName = `${base}-${index}${ext}`
    const nextPath = joinPath(parentPath(targetPath), nextName)
    if (!siblings.some(node => node.path === nextPath)) {
      return nextPath
    }
    index += 1
  }
}
