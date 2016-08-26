/** Created by hhj on 4/12/16. */
import Immutable, { List, Record, Map } from 'immutable'
import { compose } from 'redux'
import Pagination from '../Pagination'
import Sort from '../Sort'

export const InitialState = Record({
  fetching: false,
  lastFetchSignature: { fetchCollection: null, fetchOne: null },
  ids: List(),
  items: List(),
  entities: Map(),
  item: {},
  pagination: new Pagination(),
  sort: new Sort(),
  filters: Map(),
  generalParams: Map(),
})

// Note how JSON from server is revived to immutable record.
export const revive = (state = {}, initialState = new InitialState({}), itemTransformer = x => x) => {
  const { fetching, lastFetchSignature, ids, items, entities, item, pagination, sort, filters, generalParams } = state
  const mergeObj = {}
  if (fetching !== undefined) mergeObj.fetching = fetching
  if (lastFetchSignature) mergeObj.lastFetchSignature = lastFetchSignature
  if (ids) mergeObj.ids = List(ids)
  if (items) mergeObj.items = List(items)
  if (item) mergeObj.item = item
  if (entities) mergeObj.entities = Map(entities).map(itemTransformer)
  if (pagination) mergeObj.pagination = new Pagination(pagination)
  if (sort) mergeObj.sort = new Sort(sort)
  if (filters) mergeObj.filters = Map(filters)
  if (generalParams) mergeObj.generalParams = Map(generalParams)

  return initialState.merge(mergeObj);
}

export const idsReducer = (items = []) => state =>
  state.set('ids', Immutable.fromJS(items).map(item => item.get('id')))

const createEntitiesReducer = (itemTransformer = x => x, idField = 'id') => (items = []) => state => {
  const newEntities = Map(items.reduce((result, item) => {
    result[item[idField]] = itemTransformer(item)
    return result
  }, {}))

  return state.update('entities', entities => entities.merge(newEntities))
}

export const clearEntities = state => state.set('entities', (new InitialState()).entities)

export const createItemsReducer = (collectionTransformer = x => x, itemTransformer = x => x, idField = 'id') => {
  const entitiesReducer = createEntitiesReducer(itemTransformer, idField)

  return (items = []) => state => {
    items = collectionTransformer(items)
    return compose(
      state => state.set('items', List(items).map(item => item[idField])),
      entitiesReducer(items)
    )(state)
  }
}

export const createItemReducer = (itemTransformer = x => x, idField = 'id') => {
  const entitiesReducer = createEntitiesReducer(itemTransformer, idField)

  return (item = {}) => state => compose(
    state => state.set('item', item[idField]),
    entitiesReducer([item])
  )(state)
}

export const fetchingReducer = fetching => state => state.set('fetching', fetching)

export const lastFetchSignatureReducer = (nextFetchSignature, actionType) => state =>
  state.update('lastFetchSignature', lastFetchSignature => ({
    ...lastFetchSignature,
    [actionType]: nextFetchSignature
  }))

export const sortReducer = nextSort => state => state.update('sort', sort => (nextSort ? new Sort(nextSort) : sort))

export const paginationReducer = nextPagination => state => state.update(
  'pagination', pagination => (
    nextPagination ? (
      new Pagination({ ...pagination.toObject(), total: nextPagination.total, totalPages: nextPagination.totalPages })
    ) : pagination)
)

export const idsPaginationReducer = nextPagination => state => state.update('pagination', pagination =>
  (nextPagination ? new Pagination({
    ...pagination.toObject(),
    total: nextPagination.total,
    totalPages: Math.ceil(nextPagination.total / pagination.toObject().perPage)
  }) : pagination)
)
