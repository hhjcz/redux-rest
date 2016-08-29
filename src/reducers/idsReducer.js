/** Created by hhj on 8/29/16. */
import Immutable from 'immutable'

export default function createIdsReducer(actionTypes) {

  return function paginationReducer(state = {}, action) {

    const items = action.data
    if (!items) return state

    switch (action.type) {

      case actionTypes.fetchIdsSuccess:
        return Immutable.fromJS(items).map(item => item.get('id'))

      default:
        return state
    }
  }
}

