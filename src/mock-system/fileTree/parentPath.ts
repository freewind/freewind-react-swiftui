export const parentPath = (path: string) => {
  const parts = path.split('/')
  return parts.slice(0, -1).join('/') || '/'
}