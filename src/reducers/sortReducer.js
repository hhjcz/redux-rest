/** Created by hhj on 8/29/16. */
import Sort from '../models/Sort'

function setSort(currentSort, nextSort) {
  return nextSort ? new Sort(nextSort) : currentSort
}

export default function createReducer(actionTypes) {

  return function sortReducer(state = {}, action) {
    const nextSort = action.meta ? action.meta.sort : null

    switch (action.type) {

      case actionTypes.fetchCollectionSuccess:
        return setSort(state, nextSort)

      case actionTypes.sortChange:
        let newSort
        if (state.by !== action.sortField) {
          newSort = new Sort({ dir: true, by: action.sortField })
        } else if (state.dir === true) {
          newSort = new Sort({ dir: false, by: action.sortField })
        } else {
          newSort = new Sort()
        }
        return newSort

      default:
        return state
    }
  }
}
