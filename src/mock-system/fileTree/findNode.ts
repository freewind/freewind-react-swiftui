import type { MockFileNode } from '../types'

export const findNode = (nodes: MockFileNode[], path: string): MockFileNode | null => {
  for (const node of nodes) {
    if (node.path === path) {
      return node
    }
    if (node.children) {
      const hit = findNode(node.children, path)
      if (hit) {
        return hit
      }
    }
  }
  return null
}
