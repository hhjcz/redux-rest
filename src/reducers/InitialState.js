/** Created by hhj on 4/12/16. */
import { List, Record, Map } from 'immutable'
import Pagination from '../models/Pagination'
import Sort from '../models/Sort'

export const InitialState = Record({
  fetching: false,
  lastFetchSignature: { fetchCollection: null, fetchOne: null },
  itemId: {},
  collectionIds: List(),
  collectionIdsStatic: List(),
  entities: Map(),
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
  const { fetching, lastFetchSignature, collectionIdsStatic, collectionIds, entities, itemId, pagination, sort, filters, generalParams } = fromState
  const normalizedFromState = {}
  if (fetching !== undefined) normalizedFromState.fetching = fetching
  if (lastFetchSignature) normalizedFromState.lastFetchSignature = lastFetchSignature
  if (itemId) normalizedFromState.itemId = itemId
  if (collectionIdsStatic) normalizedFromState.collectionIdsStatic = List(collectionIdsStatic)
  if (collectionIds) normalizedFromState.collectionIds = List(collectionIds)
  if (entities) normalizedFromState.entities = Map(entities) // .map(itemTransformer)
  if (pagination) normalizedFromState.pagination = new Pagination(pagination)
  if (sort) normalizedFromState.sort = new Sort(sort)
  if (filters) normalizedFromState.filters = Map(filters)
  if (generalParams) normalizedFromState.generalParams = Map(generalParams)

  return new InitialState(normalizedFromState)
}
