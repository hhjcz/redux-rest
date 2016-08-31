/** Created by hhj on 8/30/16. */
import { List } from 'immutable'

/**
 * @param resourceState
 * @returns {Array|*|List<T>|List<any>}
 */
export function getItemId(resourceState) {
  return resourceState ? resourceState.itemId || null : null
}

/**
 * @param resourceState
 * @returns {Array|*|List<T>|List<any>}
 */
export function getCollectionIds(resourceState) {
  return resourceState ? resourceState.collectionIds || List() : List()
}

/**
 * @param resourceState
 * @returns {Array}
 */
export function getCollectionIdsStatic(resourceState) {
  return resourceState.collectionIdsStatic
}

/**
 * @param resourceState
 * @returns {V}
 */
export function getIdAtCursor(resourceState) {
  return getCollectionIdsStatic(resourceState).get(resourceState.pagination.cursorAt - 1)
}
