/** Created by hhj on 8/29/16. */
import { List } from 'immutable'

/**
 * @param actionTypes
 * @param idField
 * @returns {paginationReducer}
 */
export default function createItemsReducer(actionTypes, idField = 'id') {

  const itemsIds = (items) => List(items).map(item => item[idField])

  /**
   * @param {Object} state
   * @param {Object} action
   */
  return function paginationReducer(state = {}, action) {

    const items = action.data

    switch (action.type) {

      case actionTypes.fetchCollectionSuccess:
      case actionTypes.fetchCollectionByIdsSuccess:
        return itemsIds(items)

      case actionTypes.fetchCollectionError:
        return List()

      default:
        return state
    }
  }
}

