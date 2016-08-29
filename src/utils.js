/** Created by hhj on 1/29/16. */
import { List, Map } from 'immutable'

export const getSubState = endpointName => getState => {
  const state = (typeof getState === 'function') ? getState() : getState
  let subState = state.resources[endpointName]
  if (subState.toObject) subState = subState.toObject()
  return subState
}

export const getAuthSubState = getState => {
  const state = (typeof getState === 'function') ? getState() : getState
  return state.resources.auth
}

export const getItems = (resource = {}) => {
  const entities = resource.entities || Map()
  const items = (resource.items || List())
    .filter(item => entities.get(`${item}`) !== undefined)
    .map(item => entities.get(`${item}`))

  return items
}

export const getItem = (resource = {}, defaultValue = {}) => {
  // if (!resource.item) return {}
  const entities = resource.entities || Map()

  return entities.get(`${resource.item}`) || defaultValue
}

export const getIdAtCursor = (resource = {}) => resource.ids.get(resource.pagination.cursorAt - 1)

/**
 * @description For testing purposes
 *
 * @param resourcesObj
 * @private
 */
export const generateSubState = resourcesObj => ({
  resources: resourcesObj
})
