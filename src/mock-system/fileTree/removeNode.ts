import type { MockFileNode } from '../types'

export const removeNode = (nodes: MockFileNode[], path: string): MockFileNode[] => {
  return nodes
    .filter(node => node.path !== path)
    .map(node => ({
      ...node,
      children: node.children ? removeNode(node.children, path) : undefined,
    }))
}
