/** Created by hhj on 8/29/16. */

export default function createReducer(actionTypes) {

  return function lastFetchSignatureReducer(state = {}, action) {
    if (!action.meta) return state

    const setSignatureFor = (actionType) => ({
      ...state,
      [actionType]: action.meta.lastFetchSignature
    })

    switch (action.type) {
      case actionTypes.fetchCollectionSuccess:
      case actionTypes.fetchCollectionError:
        return setSignatureFor('fetchCollection')

      case actionTypes.fetchCollectionByIdsSuccess:
        return setSignatureFor('fetchCollectionByIds')

      case actionTypes.fetchIdsSuccess:
        return setSignatureFor('fetchIds')

      case actionTypes.fetchOneSuccess:
      case actionTypes.fetchOneError:
        return setSignatureFor('fetchOne')

      default:
        return state
    }
  }
}
