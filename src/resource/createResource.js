/** Created by hhj on 2/11/16. */
/* eslint-disable no-unused-expressions, no-unused-vars, import/no-extraneous-dependencies */
import responseTransformers from './responseTransformers'
import serializeParamsToUrl from './serializeParamsToUrl'

const defaultConfig = () => ({
  url: '/',
  responseTransformers,
})

const makeHeaders = (authToken) => ({
  'Content-Type': 'application/json',
  // 'Content-Type': 'application/x-www-form-url-encoded',
  'Accept': 'application/json',
  'Authorization': `Bearer ${authToken}`,
})

/**
 * @param {string} resourceName
 * @param {Object} _config
 * @param {Object} fetchHolder
 * @returns {{fetchCollection, fetchOne, create, update, destroy}}
 */
export default function createResource(resourceName, _config, fetchHolder) {
  const config = { ...defaultConfig(), ..._config }

  const createMethod = (methodName, method = 'GET') => {
    const responseTransformer = config.responseTransformers[methodName]

    return function resourceMethod(params = {}, body = {}, authToken = '') {
      const url = serializeParamsToUrl(config.url, params)
      const headers = makeHeaders(authToken)
      const bodyObj = ['GET', 'HEAD'].indexOf(method) === -1 ? { body: JSON.stringify(body) } : {}

      function executeFetch() {
        return fetchHolder.fetch(url, { method, headers, ...bodyObj })
          .then(response => {
            const normalizedResponse = responseTransformer(response)
            normalizedResponse.meta.lastFetchSignature = url
            normalizedResponse.status = response.status
            return normalizedResponse
          })
          .catch(error => {
            const message = `Ajejej, resource error: ${error.message}, url: ${url}`
            throw new Error(message)
          })
      }

      return { fetchUrl: url, executeFetch }
    }
  }

  const fetchCollection = createMethod('fetchCollection')
  const fetchOne = createMethod('fetchOne')
  const create = createMethod('create', 'POST')
  const update = createMethod('update', 'PATCH')
  const destroy = createMethod('destroy', 'DELETE')

  return {
    fetchCollection,
    fetchOne,
    create,
    update,
    destroy,
  }
}
