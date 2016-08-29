/** Created by hhj on 8/29/16. */
import { List } from 'immutable'

/**
 * @param actionTypes
 * @param idField
 * @returns {paginationReducer}
 */
export default function createItemReducer(actionTypes, idField = 'id') {

  return function paginationReducer(state = {}, action) {

    const itemId = action.data ? action.data[idField] : null

    switch (action.type) {

      case actionTypes.fetchOneSuccess:
        return itemId

      case actionTypes.fetchOneError:
        return {}

      default:
        return state
    }
  }
}

