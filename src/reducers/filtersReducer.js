/** Created by hhj on 8/29/16. */
export default function createReducer(actionTypes) {

  return function filtersReducer(state = {}, action) {
    if (!action.filter) return state
    const filters = state

    switch (action.type) {

      case actionTypes.filterChange:
        if (action.filter.value === '' || action.filter.value === null) {
          return filters.delete(action.filter.name)
        }
        return filters.set(action.filter.name, action.filter)


      default:
        return state
    }
  }
}
