/** Created by hhj on 8/29/16. */
import { List } from 'immutable'

export default function createItemsReducer(actionTypes, idField = 'id') {

  const itemsIds = (items) => List(items).map(item => item[idField])

  return function paginationReducer(state = {}, action) {

    const items = action.data

    switch (action.type) {

      case actionTypes.fetchCollectionSuccess:
      case actionTypes.fetchCollectionByIdsSuccess:
      case actionTypes.fetchIdsSuccess:
        return itemsIds(items)

      case actionTypes.fetchCollectionError:
        return List()

      default:
        return state
    }
  }
}

