/** Created by hhj on 8/29/16. */
/**
 * @param actionTypes
 * @returns {generalParamsReducer}
 */
export default function createReducer(actionTypes) {

  return function generalParamsReducer(state = {}, action) {
    if (!action.paramObj) return state

    switch (action.type) {
      case actionTypes.generalParamChange:
        if (action.paramObj.value === '') return state.delete(action.paramObj.name)
        return state.set(action.paramObj.name, action.paramObj.value)

      default:
        return state
    }
  }
}
