/** Created by hhj on 2/2/16. */
import { camelize, camelizeKeys } from 'humps'

function createCollectionNormalizer(collectionTransformer = (x => x)) {
  return function normalizeCollection(response) {
    const camelized = camelizeKeys(response)
    const normalizedResponse = {
      data: collectionTransformer(camelized.data || []),
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
}

function normalizeItem(response) {
  const camelized = camelizeKeys(response)
  return {
    data: camelized,
    meta: camelized.meta || {}
  }
}


function responseNormalizers(collectionTransformer = (x => x)) {
  return {
    fetchCollection: createCollectionNormalizer(collectionTransformer),
    fetchOne: normalizeItem,
    create: normalizeItem,
    update: normalizeItem,
    destroy: normalizeItem,
  }
}

export default responseNormalizers
