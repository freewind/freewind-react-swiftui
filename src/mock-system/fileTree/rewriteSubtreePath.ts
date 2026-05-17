import type { MockFileNode } from '../types'

export const rewriteSubtreePath = (node: MockFileNode, prevRoot: string, nextRoot: string): MockFileNode => {
  return {
    ...node,
    path: node.path.replace(prevRoot, nextRoot),
    children: node.children?.map(child => rewriteSubtreePath(child, prevRoot, nextRoot)),
  }
}
