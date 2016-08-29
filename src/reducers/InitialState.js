/** Created by hhj on 4/12/16. */
import Immutable, { List, Record, Map } from 'immutable'
import { compose } from 'redux'
import Pagination from '../models/Pagination'
import Sort from '../models/Sort'

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
export const revive = (state = {}, initialState = new InitialState(), itemTransformer = x => x) => {
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

  console.log(initialState)
  return initialState.merge(mergeObj)
}

