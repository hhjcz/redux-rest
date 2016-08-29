/** Created by hhj on 1/29/16. */
import createRestReducer from './reducers/createRestReducer'
import createRestAction from './actions/createRestAction'
import { actionTypesFor } from './actions/actionTypesFor'
import { actionCreatorsFor } from './actions/actionCreatorsFor'
import authReducer from './reducers/authReducer'
import { createAuthActions } from './actions/authActions'

export default function createMyRest(config = {}, fetch = () => ({}), dispatch = null, errorHandler = null) {
  const myRest = { actions: {}, reducers: {}, entityReducers: {} }
  const depsContainer = { fetch, dispatch, errorHandler }

  // authentication reducers and actions:
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
