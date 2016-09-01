/** Created by hhj on 1/29/16. */
import { combineReducers } from 'redux'
import actionTypesFor from './actions/actionTypesFor'
import actionCreatorsFor from './actions/actionCreatorsFor'
import createRestActions from './actions/createRestActions'
import createRestReducer from './reducers/createRestReducer'
import createAuthActions from './actions/authActions'
import authReducer from './reducers/authReducer'
import { selectResourceFn } from './selectors'

const defaultDeps = {
  fetch: () => ({}),
  dispatch: null,
  errorHandler: null,
}
const defaultConfig = {
  selectResourcesRoot: (state) => state.resources
}

/**
 * @param {Object} config
 * @param {Object} depsContainer
 * @returns {Object} rest helper {actions: {}, reducer: function}
 */
export default function createRest(config = {}, depsContainer = {}) {
  config = { ...defaultConfig, ...config }
  depsContainer = { ...defaultDeps, ...depsContainer }
  const rest = { actions: {}, reducer: null }
  const reducers = {}

  // authentication reducers and actions
  const authActionCreators = createAuthActions(depsContainer)
  rest.actions.auth = authActionCreators
  rest.auth = { actions: authActionCreators }
  reducers.auth = authReducer

  // each resource
  Object.keys(config.resources).forEach(resourceName => {
    const resourceConfig = {
      selectResourcesRoot: config.selectResourcesRoot,
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

    // reducer
    reducers[resourceName] = createRestReducer(
      resourceName,
      resourceConfig,
      actionTypes)

  })

  rest.reducer = combineReducers({ ...reducers })

  // utils
  rest.selectResourcesRoot = config.selectResourcesRoot
  rest.selectResource = selectResourceFn(config.selectResourcesRoot)
  rest.use = (key, value) => {
    depsContainer[key] = value
    return rest
  }

  return rest
}
