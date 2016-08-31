/** Created by hhj on 8/30/16. */
import Immutable from 'immutable'
import { getItems, getItem } from './items'

export { getItem, getItems }
export { getIdAtCursor } from './ids'
export { getAuthTree } from './auth'

/**
 * @param resourceName
 * @returns {function(resourcesRoot): *}
 */
export function getResourceWithItems(resourceName) {
  return (resourcesRoot) => {
    const resource = resourcesRoot[resourceName]

    // insert items:
    const items = getItems(resource)
    const item = getItem(resource)
    const resourceObj = resource.toObject ? resource.toObject() : resource

    return { ...resourceObj, items, item }
  }
}

/**
 * @param resourceName
 * @returns {function(*)}
 */
export function getResourceTree(resourceName) {
  return (getResourcesRoot) => {
    return (state) => {
      const resourcesRoot = getResourcesRoot(state)
      const subState = resourcesRoot[resourceName]
      return subState.toObject ? subState.toObject() : subState
    }
  }
}
