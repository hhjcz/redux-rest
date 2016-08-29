/** Created by hhj on 8/29/16. */

export default function createReducer(actionTypes, initialState = false) {

  return function isFetchingReducer(state = {}, action) {
    switch (action.type) {
      case actionTypes.fetchCollectionRequested:
      case actionTypes.fetchCollectionByIdsRequested:
      case actionTypes.fetchIdsRequested:
      case actionTypes.fetchOneRequested:
      case actionTypes.createRequested:
      case actionTypes.updateRequested:
        return true

      case actionTypes.fetchCollectionSuccess:
      case actionTypes.fetchCollectionByIdsSuccess:
      case actionTypes.fetchIdsSuccess:
      case actionTypes.fetchCollectionError:
      case actionTypes.fetchOneSuccess:
      case actionTypes.fetchOneError:
      case actionTypes.createSuccess:
      case actionTypes.updateSuccess:
      case actionTypes.createError:
      case actionTypes.updateError:
        return false

      default:
        return state
    }
  }
}
