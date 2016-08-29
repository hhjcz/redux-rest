/** Created by hhj on 2/2/16. */
import { camelize, camelizeKeys } from 'humps'

function collection(response) {
  const camelized = camelizeKeys(response)
  const normalizedResponse = {
    data: camelized.data || [],
    meta: camelized.meta || {}
  }
  if (normalizedResponse.meta.sort) {
    normalizedResponse.meta.sort = {
      dir: normalizedResponse.meta.sort.indexOf('-') > -1,
      by: camelize(normalizedResponse.meta.sort || '')
    }
  }
  if (normalizedResponse.meta.pagination) {
    normalizedResponse.meta.pagination = {
      ...normalizedResponse.meta.pagination,
      page: normalizedResponse.meta.pagination.currentPage,
    }
  }

  return normalizedResponse
}

function item(response) {
  const camelized = camelizeKeys(response)
  return {
    data: camelized,
    meta: camelized.meta || {}
  }
}

const responseTransformers = {
  fetchCollection: collection,
  fetchOne: item,
  create: item,
  update: item,
  destroy: item,
}

export default responseTransformers
