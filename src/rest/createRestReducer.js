/** Created by hhj on 1/29/16. */
/* eslint-disable max-len */
/* eslint-disable no-case-declarations */
import { compose } from 'redux'
import Pagination, { setPage, setPageSize } from '../Pagination'
import Sort from '../Sort'
import {
  InitialState,
  revive,
  idsReducer,
  createItemsReducer,
  createItemReducer,
  fetchingReducer,
  lastFetchSignatureReducer,
  idsPaginationReducer,
  paginationReducer,
  sortReducer,
  clearEntities
} from './reduceHelpers'


/**
 * @param endpointName
 * @param config
 * @param {ActionTypes} actionTypes
 * @returns {reducer}
 */
export default function createRestReducer(endpointName, config = {}, actionTypes = {}) {
  const collectionTransformer = config.collectionTransformer || (collection => collection)
  const itemTransformer = config.itemTransformer || (item => item)
  const idField = config.idField || 'id'
  const itemsReducer = createItemsReducer(collectionTransformer, itemTransformer, idField)
  const itemReducer = createItemReducer(itemTransformer, idField)

  const initialState = new InitialState(config.defaultState || {})

  return function reducer(state = {}, action) {
    // Note how JSON from server is revived to immutable record.
    if (!(state instanceof InitialState)) {
      return revive(state, initialState, itemTransformer)
    }

    switch (action.type) {
      case actionTypes.fetchCollectionRequested:
      case actionTypes.fetchCollectionByIdsRequested:
      case actionTypes.fetchIdsRequested:
      case actionTypes.fetchOneRequested:
      case actionTypes.createRequested:
      case actionTypes.updateRequested:
        return fetchingReducer(true)(state)

      case actionTypes.fetchCollectionSuccess:
        return compose(
          itemsReducer(action.data),
          fetchingReducer(false),
          lastFetchSignatureReducer(action.meta.lastFetchSignature, 'fetchCollection'),
          sortReducer(action.meta.sort),
          paginationReducer(action.meta.pagination),
        )(state)

      case actionTypes.fetchCollectionByIdsSuccess:
        return compose(
          itemsReducer(action.data),
          fetchingReducer(false),
          lastFetchSignatureReducer(action.meta.lastFetchSignature, 'fetchCollectionByIds'),
        )(state)

      case actionTypes.fetchIdsSuccess:
        return compose(
          idsReducer(action.data),
          fetchingReducer(false),
          lastFetchSignatureReducer(action.meta.lastFetchSignature, 'fetchIds'),
          idsPaginationReducer(action.meta.pagination),
        )(state)

      case actionTypes.fetchCollectionError:
        return compose(
          itemsReducer([]),
          fetchingReducer(false),
          lastFetchSignatureReducer('', 'fetchCollection')
        )(state)

      case actionTypes.fetchOneSuccess:
        return compose(
          itemReducer(action.data),
          fetchingReducer(false),
          lastFetchSignatureReducer(action.meta.lastFetchSignature, 'fetchOne'),
        )(state)

      case actionTypes.fetchOneError:
        return compose(
          itemReducer({}),
          fetchingReducer(false),
          lastFetchSignatureReducer('', 'fetchOne')
        )(state)

      case actionTypes.createSuccess:
      case actionTypes.updateSuccess:
      case actionTypes.createError:
      case actionTypes.updateError:
        return fetchingReducer(false)(state)

      case actionTypes.gotoPage:
        return state.update('pagination', pagination => setPage(pagination, action.page))

      case actionTypes.setPagination:
        return state.set('pagination', action.pagination)

      case actionTypes.pointCursorTo:
        const page = Math.ceil(action.cursorAt / state.pagination.perPage)
        return state.update('pagination', pagination => new Pagination({
          ...pagination.toObject(),
          cursorAt: action.cursorAt,
          page,
        }))

      case actionTypes.setPageSize:
        return state.update('pagination', pagination => setPageSize(pagination, action.perPage))

      case actionTypes.sortChange:
        let newSort
        if (state.sort.by !== action.sortField) {
          newSort = new Sort({ dir: true, by: action.sortField })
        } else if (state.sort.dir === true) {
          newSort = new Sort({ dir: false, by: action.sortField })
        } else {
          newSort = new Sort()
        }

        return state.update('sort', () => newSort)

      case actionTypes.filterChange:
        return state.update('filters', filters => {
          if (action.filter.value === '' || action.filter.value === null) {
            return filters.delete(action.filter.name)
          }
          return filters.set(action.filter.name, action.filter)
        })

      case actionTypes.generalParamChange:
        return state.update('generalParams', generalParams => {
          if (action.paramObj.value === '') return generalParams.delete(action.paramObj.name)
          return generalParams.set(action.paramObj.name, action.paramObj.value)
        })

      case actionTypes.clearEntities:
        return clearEntities(state)

      default:
        return state
    }
  }
}
