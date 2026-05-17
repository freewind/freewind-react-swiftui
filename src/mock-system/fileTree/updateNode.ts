import type { MockFileNode } from '../types'

export const updateNode = (
  nodes: MockFileNode[],
  path: string,
  updater: (node: MockFileNode) => MockFileNode,
): MockFileNode[] => {
  return nodes.map(node => {
    if (node.path === path) {
      return updater(node)
    }
    if (node.children) {
      return {
        ...node,
        children: updateNode(node.children, path, updater),
      }
    }
    return node
  })
}
