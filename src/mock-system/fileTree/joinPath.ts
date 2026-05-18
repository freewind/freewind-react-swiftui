export const joinPath = (base: string, fileName: string) => {
  return `${base.replace(/\/$/, '')}/${fileName}`
}