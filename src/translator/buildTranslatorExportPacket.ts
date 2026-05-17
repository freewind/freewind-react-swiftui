import type { TranslatorExportPacket } from './types'
import { getTranslatorPageSpec } from './pageRegistry'

export const buildTranslatorExportPacket = (pageId: string): TranslatorExportPacket => {
  const spec = getTranslatorPageSpec(pageId) ?? getTranslatorPageSpec('translator')
  if (!spec) {
    throw new Error(`missing translator page spec: ${pageId}`)
  }

  return {
    page: spec.page,
    constraints: spec.constraints,
    mappings: spec.mappings,
    stateModels: spec.stateModels,
    apiFacades: spec.apiFacades,
    components: spec.components,
    modifiers: spec.modifiers,
    fewShot: spec.fewShot,
    prompt: spec.prompt,
    jsxSource: spec.jsxSource,
  }
}
