/** Created by hhj on 8/30/16. */
import { selectItems, selectItem } from './items'

export { selectItem, selectItems }
export { selectIdAtCursor } from './ids'
export { selectAuthTree } from './auth'

/**
 * @param getResourcesRoot
 * @returns {function(*): function(*=)}
 */
export function selectResourceTree(getResourcesRoot) {
  return (resourceName) =>
    (state) => {
      const resourcesRoot = getResourcesRoot(state)
      const resource = resourcesRoot[resourceName]
      return resource && resource.toObject ? resource.toObject() : resource
    }
}

/**
 * Returns denormalized resource state - calculates items etc.
 *
 * @param getResourcesRoot
 * @returns {function(*=)}
 */
export function selectResource(getResourcesRoot) {
  return (resourceName) =>
    (state) => {
      const resourceObj = selectResourceTree(getResourcesRoot)(resourceName)(state)

      // insert items:
      const items = selectItems(resourceObj)
      const item = selectItem(resourceObj)

      return { ...resourceObj, items, item }
    }
}

