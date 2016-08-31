/** Created by hhj on 8/30/16. */
import Immutable from 'immutable'
import { getItems, getItem } from './items'

export { getItem, getItems }
export { getIdAtCursor } from './ids'
export { getAuthTree } from './auth'

/**
 * @param getResourcesRoot
 * @returns {function(*): function(*=)}
 */
export function getResourceTree(getResourcesRoot) {
  return (resourceName) =>
    (state) => {
      const resourcesRoot = getResourcesRoot(state)
      const resource = resourcesRoot[resourceName]
      return resource && resource.toObject ? resource.toObject() : resource
    }
}

/**
 * @param getResourcesRoot
 * @returns {function(*=)}
 */
export function getResourceWithItems(getResourcesRoot) {
  return (resourceName) =>
    (state) => {
      const resourceObj = getResourceTree(getResourcesRoot)(resourceName)(state)

      // insert items:
      const items = getItems(resourceObj)
      const item = getItem(resourceObj)

      return { ...resourceObj, items, item }
    }
}

