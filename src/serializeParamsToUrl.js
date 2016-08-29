/** Created by hhj on 2/15/16. */
import omit from 'lodash/omit'
import qs from 'query-string'

const rxClean = /(\/\(:[^\/]+\)|\/:[^\/]+)/g;

export default function serializeParamsToUrl(urlTemplate, params = {}) {
  const usedKeys = []
  let urlWithParams = Object.keys(params).reduce(
    (url, key) => url.replace(new RegExp(`(\\(:${key}\\)|:${key})`, 'g'), () => {
      usedKeys.push(key)
      return params[key]
    }),
    urlTemplate
  )
  // remove unused params from template
  urlWithParams = urlWithParams.replace(rxClean, '')
  if (usedKeys.length !== Object.keys(params).length) {
    const urlObject = urlWithParams.split('?')
    const mergeParams = {
      ...(urlObject[1] && qs.parse(urlObject[1])),
      ...omit(params, usedKeys)
    }
    urlWithParams = `${urlObject[0]}?${qs.stringify(mergeParams)}`
  }

  return urlWithParams
}
