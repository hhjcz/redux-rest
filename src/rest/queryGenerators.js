/** Created by hhj on 1/28/16. */
import snakeCase from 'lodash/snakeCase'

function parseFilters(filters) {

  const apiFilters = filters.reduce((result, filter, filterName) => {
    let suffix = ''
    let value = ''
    const comparator = filter.comparator || 'contains'

    if (comparator === 'contains' && filter.value !== null) {
      suffix = '-lk'
      value = `%${filter.value}%`
    } else if (comparator === 'begins' && filter.value !== null) {
      suffix = '-lk'
      value = `${filter.value}%`;
    } else if (comparator === 'empty' && filter.value === false) {
      suffix = '-not'
      value = ''
    } else if (comparator === 'empty' && filter.value === true) {
      suffix = '-null'
      value = null
    } else if (filter.value !== null) {
      suffix = ''
      value = filter.value
    } else return null

    result[snakeCase(filterName) + suffix] = value

    return result
  }, {})

  return apiFilters;
}

function collection(state, extraParams = {}) {
  const { pagination, sort, filters, generalParams } = state
  const { page, perPage } = pagination || {};
  let queryParams = {}

  if (page > 0) queryParams.page = page
  if (perPage > 0) queryParams.per_page = perPage
  if (sort && sort.by) queryParams.sort = `${sort.dir ? '-' : ''}${snakeCase(sort.by)}`
  if (filters && filters.forEach) queryParams = { ...queryParams, ...parseFilters(filters) }
  if (generalParams) queryParams = { ... queryParams, ...generalParams.toObject() }

  return { ...queryParams, ...extraParams }
}

function collectionByIds(state, extraParams = {}) {
  const { ids, pagination, sort } = state
  const queryParams = { page: 1, per_page: 10000000 }
  if (sort && sort.by) queryParams.sort = `${sort.dir ? '-' : ''}${snakeCase(sort.by)}`

  const pageStart = (pagination.page - 1) * pagination.perPage
  const pageEnd = pageStart + pagination.perPage
  const paginatedIds = ids.slice(pageStart, pageEnd).toArray()
  const idsQuery = paginatedIds.join('|')
  queryParams['id-in'] = idsQuery

  return { ...queryParams, ...extraParams }
}

function item(state, extraParams = {}) { // eslint-disable-line no-unused-vars
  return { ...extraParams }
}

const queryGenerators = {
  fetchCollection: collection,
  fetchCollectionByIds: collectionByIds,
  fetchIds: collection,
  fetchOne: item,
}

export default queryGenerators
