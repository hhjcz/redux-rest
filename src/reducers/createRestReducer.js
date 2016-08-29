/** Created by hhj on 1/29/16. */
/* eslint-disable max-len */
/* eslint-disable no-case-declarations */
import { combineReducers } from 'redux'
import { List, Record, Map } from 'immutable'
import { InitialState, revive } from './InitialState'
import createIsFetching from './isFetchingReducer'
import createLastFetchSignature from './lastFetchSignatureReducer'
import createIdsReducer from './idsReducer'
import createItemsReducer from './itemsReducer'
import createItemReducer from './itemReducer'
import createEntitiesReducer from './entitiesReducer'
import createPagination from './paginationReducer'
import createSort from './sortReducer'
import createFilters from './filtersReducer'
import createGeneralParams from './generalParamsReducer'

/**
 * @param endpointName
 * @param config
 * @param {ActionTypes} actionTypes
 * @returns {reducer}
 */
export default function createRestReducer(endpointName, config = {}, actionTypes = {}) {
  const itemTransformer = config.itemTransformer || (item => item)
  const idField = config.idField || 'id'

  const defaultState = config.defaultState || {}

  const combinedReducers = combineReducers({
    fetching: createIsFetching(actionTypes),
    lastFetchSignature: createLastFetchSignature(actionTypes),
    ids: createIdsReducer(actionTypes),
    items: createItemsReducer(actionTypes, idField),
    item: createItemReducer(actionTypes, idField),
    entities: createEntitiesReducer(actionTypes, itemTransformer, idField),
    pagination: createPagination(actionTypes),
    sort: createSort(actionTypes),
    filters: createFilters(actionTypes),
    generalParams: createGeneralParams(actionTypes)
  })


  return function restReducer(state, action) {
    // TODO test state not initialized (was state not instance of InitialState)
    if (!(state instanceof InitialState)) {
      return new InitialState(state)
    }
    if (!action || !action.type) {
      return state
    }

    return combinedReducers(state, action)
  }
}
