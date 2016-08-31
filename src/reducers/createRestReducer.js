/** Created by hhj on 1/29/16. */
/* eslint-disable max-len */
/* eslint-disable no-case-declarations */
import { combineReducers } from 'redux'
import { InitialState, makeInitialState } from './InitialState'
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
 * @param config
 * @param {ActionTypes} actionTypes
 * @returns {reducer}
 */
export default function createRestReducer(config = {}, actionTypes = {}) {
  const itemTransformer = config.itemTransformer || (item => item)
  const idField = config.idField || 'id'

  const defaultState = config.defaultState || {}

  const combinedReducers = combineReducers({
    fetching: createIsFetching(actionTypes),
    lastFetchSignature: createLastFetchSignature(actionTypes),
    itemId: createItemReducer(actionTypes, idField),
    collectionIds: createItemsReducer(actionTypes, idField),
    collectionIdsStatic: createIdsReducer(actionTypes),
    entities: createEntitiesReducer(actionTypes, itemTransformer, idField),
    pagination: createPagination(actionTypes),
    sort: createSort(actionTypes),
    filters: createFilters(actionTypes),
    generalParams: createGeneralParams(actionTypes)
  })


  return function restReducer(state, action) {
    if (!(state instanceof InitialState)) return makeInitialState({ ...defaultState, ...state })
    // if (!action.type) return state
    // if (action.type.toLowerCase().indexOf(endpointName.toLowerCase()) === -1) return state

    // combineReducers works with plain object state only
    const nextState = combinedReducers(state.toObject(), action)
    // convert back to immutable after reducing
    return new InitialState(nextState)
  }
}
