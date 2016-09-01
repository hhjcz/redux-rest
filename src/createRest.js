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
const defaultConfig = {
  getRootTree: (state) => state.resources
}

export default function createRest(config = {}, depsContainer = {}) {
  config = { ...defaultConfig, ...config }
  depsContainer = { ...defaultDeps, ...depsContainer }
  const rest = { actions: {}, reducers: {} }

  // authentication reducers and actions:
  const authActionCreators = createAuthActions(depsContainer)
  rest.reducers.auth = authReducer
  rest.actions.auth = authActionCreators
  rest.auth = { reducer: authReducer, actions: authActionCreators }

  Object.keys(config.resources).forEach(resourceName => {
    const resourceConfig = {
      getRootTree: config.getRootTree,
      ...config.resources[resourceName]
    }
    // actions
    const actionTypes = actionTypesFor(resourceName)
    const actionCreators = actionCreatorsFor(actionTypes)
    const actions = createRestActions(
      resourceName,
      resourceConfig,
      { ...actionCreators, ...authActionCreators },
      depsContainer
    )
    rest.actions[resourceName] = actions
    rest[resourceName] = { actions }

    // reducers
    const reducer = createRestReducer(
      resourceName,
      resourceConfig,
      actionTypes)
    rest.reducers[resourceName] = reducer
    rest[resourceName].reducer = reducer

    // utils
    rest.getRootTree = config.getRootTree
  })


  rest.use = (key, value) => {
    depsContainer[key] = value
    return rest
  }

  return rest
}
