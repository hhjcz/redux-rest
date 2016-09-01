/** Created by hhj on 8/30/16. */
import { List } from 'immutable'

/**
 * @param resourceState
 * @returns {Array|*|List<T>|List<any>}
 */
export function selectItemId(resourceState) {
  return resourceState ? resourceState.itemId || null : null
}

/**
 * @param resourceState
 * @returns {Array|*|List<T>|List<any>}
 */
export function selectCollectionIds(resourceState) {
  return resourceState ? resourceState.collectionIds || List() : List()
}

/**
 * @param resourceState
 * @returns {Array}
 */
export function selectCollectionIdsStatic(resourceState) {
  return resourceState.collectionIdsStatic
}

/**
 * @param resourceState
 * @returns {V}
 */
export function selectIdAtCursor(resourceState) {
  return selectCollectionIdsStatic(resourceState).get(resourceState.pagination.cursorAt - 1)
}
