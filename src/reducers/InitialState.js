/** Created by hhj on 4/12/16. */
import { List, Record, Map } from 'immutable'
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

/**
 * @param {Object{ fromState
 * @returns {Map<string, any>}
 */
export function makeInitialState(fromState = {}) {
  const { fetching, lastFetchSignature, ids, items, entities, item, pagination, sort, filters, generalParams } = fromState
  const normalizedFromState = {}
  if (fetching !== undefined) normalizedFromState.fetching = fetching
  if (lastFetchSignature) normalizedFromState.lastFetchSignature = lastFetchSignature
  if (ids) normalizedFromState.ids = List(ids)
  if (items) normalizedFromState.items = List(items)
  if (item) normalizedFromState.item = item
  if (entities) normalizedFromState.entities = Map(entities) // .map(itemTransformer)
  if (pagination) normalizedFromState.pagination = new Pagination(pagination)
  if (sort) normalizedFromState.sort = new Sort(sort)
  if (filters) normalizedFromState.filters = Map(filters)
  if (generalParams) normalizedFromState.generalParams = Map(generalParams)

  return new InitialState(normalizedFromState)
}
