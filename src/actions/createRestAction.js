/** Created by hhj on 1/29/16. */
import { decamelizeKeys } from 'humps'
import createResource from '../resource/createResource'
import { getSubState, getAuthSubState } from '../utils'
import queryGenerators from '../queryGenerators'
import Filter from '../models/Filter'

export default function createRestAction(endpointName, config, actionCreators, depsContainer) {
  const getThisSubState = getSubState(endpointName)

  const resource = createResource(endpointName, config, depsContainer)
  const extraParams = decamelizeKeys(config.extraParams)
  const isStaticCollection = config.isStaticCollection || false

  /**
   *  create ASYNC action creators
   *
   * @param {string} actionName
   * @param {string} resourceMethod Specify method of the resource to be called, when it differs from actionName
   * @param methodExtraParams
   * @returns {function({}=)}
   */
  const createAsyncAction = (actionName, resourceMethod = null, methodExtraParams = {}) => {
    if (!resourceMethod) resourceMethod = actionName

    const subActionCreators = {
      requested: actionCreators[`${actionName}Requested`],
      success: actionCreators[`${actionName}Success`],
      error: actionCreators[`${actionName}Error`],
    }
    const queryGenerator = queryGenerators[actionName] || (() => ({}))

    /* eslint-disable arrow-body-style */
    return ({ params, body } = {}) => {

      return depsContainer.dispatch(({ dispatch, getState }) => {

        const state = getThisSubState(getState)
        const authState = getAuthSubState(getState)
        const queryParams = { ...queryGenerator(state), ...extraParams, ...decamelizeKeys(params), ...methodExtraParams } // eslint-disable-line max-len
        const { executeFetch } = resource[resourceMethod](queryParams, body, authState ? authState.token : '')

        dispatch(subActionCreators.requested())

        return executeFetch()
          .then(response => {
            if (response.status === 401 || response.status === 403) {
              dispatch(actionCreators.authenticationRequired())
              dispatch(subActionCreators.error({ errorMessage: 'Error: unauthorized' }))
              return response
            }
            dispatch(subActionCreators.success(response))
            return response
          })
          .catch(error => {
            console.log(error)
            const errorMessage = `${error.message}`
            dispatch(subActionCreators.error({ errorMessage }))
            depsContainer.errorHandler(errorMessage)
          })
      })
    }
  }

  // fetchIds uses fetchCollection resource with predefined params:
  const fetchIds = createAsyncAction('fetchIds', 'fetchCollection', {
    fields: 'id',
    page: 1,
    per_page: 10000000,
    include: null
  })
  const fetchCollection = createAsyncAction('fetchCollection')
  const fetchCollectionByIds = createAsyncAction('fetchCollectionByIds', 'fetchCollection')
  const fetchOne = createAsyncAction('fetchOne')
  const create = createAsyncAction('create')
  const update = createAsyncAction('update')
  const destroy = createAsyncAction('destroy')


  const updateCollection = () => {
    if (isStaticCollection) return fetchIds().then(() => fetchCollectionByIds())

    return fetchCollection()
  }

  // ***** SYNC action creators ***** */

  const pointCursorTo = cursorAt => ({ dispatch }) => {
    return dispatch(actionCreators.pointCursorTo({ cursorAt }))
  }

  const fetchOneAt = cursorAt => ({ dispatch, getState }) => {
    dispatch(actionCreators.pointCursorTo({ cursorAt }))

    const subState = getThisSubState(getState)
    const id = subState.ids.get(cursorAt - 1)
    if (!id) depsContainer.handleError(`No valid resource '${endpointName}' found at position ${cursorAt}`)

    return fetchOne({ params: { id } })
  }

  const gotoPage = page => ({ dispatch }) => {
    dispatch(actionCreators.gotoPage({ page }))

    const fetchFn = isStaticCollection ? fetchCollectionByIds : fetchCollection
    return fetchFn()
  }

  const setPagination = pagination => ({ dispatch }) => {
    dispatch(actionCreators.setPagination({ pagination }))

    const fetchFn = isStaticCollection ? fetchCollectionByIds : fetchCollection
    return fetchFn()
  }

  const setPageSize = perPage => ({ dispatch }) => {
    dispatch(actionCreators.setPageSize({ perPage }))
    return updateCollection()
  }

  const sortChange = sortField => ({ dispatch }) => {
    dispatch(actionCreators.sortChange({ sortField }))
    return updateCollection()
  }

  /**
   * @param {Array||Filter} filter
   */
  const filterChange = filter => ({ dispatch }) => {
    if (filter.constructor !== Array) filter = [filter]
    filter.forEach(filter => {
      if (!(filter instanceof Filter)) filter = new Filter(filter)
      dispatch(actionCreators.filterChange({ filter }))
    })
    return updateCollection()
  }

  const generalParamChange = paramObj => ({ dispatch }) => {
    dispatch(actionCreators.generalParamChange({ paramObj }))
    return updateCollection()
  }

  const clearEntities = () => depsContainer.dispatch(actionCreators.clearEntities())

  return {
    fetchIds,
    fetchCollection,
    fetchCollectionByIds,
    fetchOne,
    create,
    update,
    destroy,
    pointCursorTo,
    fetchOneAt,
    gotoPage,
    setPagination,
    setPageSize,
    sortChange,
    filterChange,
    generalParamChange,
    clearEntities,
  }
}
