/** Created by hhj on 1/29/16. */
import actionTypesFor from './actions/actionTypesFor'
import actionCreatorsFor from './actions/actionCreatorsFor'
import createRestActions from './actions/createRestActions'
import createRestReducer from './reducers/createRestReducer'
import createAuthActions from './actions/authActions'
import authReducer from './reducers/authReducer'

const defaultDeps = {
  fetch: () => ({}),
  dispatch: null,
  errorHandler: null,
}

export default function createRest(config = {}, depsContainer = {}) {
  depsContainer = { ...defaultDeps, ...depsContainer }
  const rest = { actions: {}, reducers: {} }

  // authentication reducers and actions:
  const authActionCreators = createAuthActions(depsContainer)
  rest.reducers.auth = authReducer
  rest.actions.auth = authActionCreators
  rest.auth = { reducer: authReducer, actions: authActionCreators }

  Object.keys(config).forEach(endpointName => {
    // actions
    const actionTypes = actionTypesFor(endpointName)
    const actionCreators = actionCreatorsFor(actionTypes)
    const actions = createRestActions(
      endpointName,
      config[endpointName],
      { ...actionCreators, ...authActionCreators },
      depsContainer
    )
    rest.actions[endpointName] = actions
    rest[endpointName] = { actions }

    // reducers
    const reducer = createRestReducer(
      endpointName,
      config[endpointName],
      actionTypes)
    rest.reducers[endpointName] = reducer
    rest[endpointName].reducer = reducer
  })


  rest.use = (key, value) => {
    depsContainer[key] = value
    return rest
  }

  return rest
}
