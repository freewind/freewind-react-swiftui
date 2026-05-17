import type { MockFileNode } from '../types'
import { joinPath } from './joinPath'
import { parentPath } from './parentPath'
import { rewriteSubtreePath } from './rewriteSubtreePath'

export const renameNode = (nodes: MockFileNode[], path: string, nextFileName: string): MockFileNode[] => {
  return nodes.map(node => {
    if (node.path === path) {
      const nextPath = joinPath(parentPath(path), nextFileName)
      return rewriteSubtreePath({ ...node, fileName: nextFileName, path: nextPath }, path, nextPath)
    }
    if (node.children) {
      return {
        ...node,
        children: renameNode(node.children, path, nextFileName),
      }
    }
    return node
  })
}
