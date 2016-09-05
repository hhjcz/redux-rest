/** Created by hhj on 8/30/16. */
import R from 'ramda'
import { selectItems, selectItem } from './items'

export { selectItem, selectItems }
export { selectIdAtCursor } from './ids'
export { selectAuthTreeFn } from './auth'

function _selectResourceTreeFn(selectResourcesRoot, resourceName, state) {
  const resourcesRoot = selectResourcesRoot(state)
  const resource = resourcesRoot[resourceName]
  return resource && resource.toObject ? resource.toObject() : resource
}

/**
 * @param selectResourcesRoot
 * @returns {function(*): function(*=)}
 */
export const selectResourceTreeFn = R.curry(_selectResourceTreeFn)

/**
 * Makes selector that returns denormalized resource state - calculates items etc.
 *
 * @param selectResourcesRoot
 * @returns {function(*=)}
 */
export function selectResourceFn(selectResourcesRoot) {
  return (resourceName) =>
    (state) => {
      const resourceObj = selectResourceTreeFn(selectResourcesRoot)(resourceName)(state)

      // insert items:
      const items = selectItems(resourceObj)
      const item = selectItem(resourceObj)

      return { ...resourceObj, items, item }
    }
}

