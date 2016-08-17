/** Created by hhj on 1/29/16. */
import createRestReducer from './createRestReducer'
import createRestAction from './createRestAction'
import { actionTypesFor } from './actionTypesFor'
import { actionCreatorsFor } from './actionCreatorsFor'
import authReducer from './authReducer'
import { createAuthActions } from './authActions'

export { getSubState, getItems, getItem, getIdAtCursor } from './utils'
export const collectionTypes = { static: 'static', dynamic: 'dynamic' }

export default function createMyRest(config = {}, fetch = () => ({}), dispatch = null) {
  const myRest = { actions: {}, reducers: {}, entityReducers: {} }
  const depsContainer = { fetch, dispatch }

  // authentication reducer and actions:
  const authActions = createAuthActions(depsContainer)
  myRest.reducers.auth = authReducer
  myRest.actions.auth = authActions
  myRest.auth = { reducer: authReducer, actions: authActions }

  Object.keys(config).forEach(endpointName => {
    const actionTypes = actionTypesFor(endpointName)
    const actionCreators = actionCreatorsFor(actionTypes)
    const actions = createRestAction(
      endpointName,
      config[endpointName],
      { ...actionCreators, ...authActions },
      depsContainer
    )
    myRest.actions[endpointName] = actions
    myRest[endpointName] = { actions }

    const reducer = createRestReducer(
      endpointName,
      config[endpointName],
      actionTypes)
    myRest.reducers[endpointName] = reducer
    myRest[endpointName].reducer = reducer
  })


  myRest.use = (key, value) => {
    depsContainer[key] = value
    return myRest
  }

  return myRest
}
