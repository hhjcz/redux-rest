/** Created by hhj on 8/30/16. */
import { List, Map } from 'immutable'
import { getItemId, getCollectionIds } from './ids'

function getEntities(resourceState) {
  return resourceState ? resourceState.entities || Map() : Map()
}

function getEntity(id) {
  return (entities) => entities.get(`${id}`)
}

/**
 * @param resourceState
 * @returns {Array|Iterable<K, *>}
 */
export function getItems(resourceState) {
  const entities = getEntities(resourceState)
  const items = getCollectionIds(resourceState)
    .filter(id => getEntity(id)(entities) !== undefined)
    .map(id => getEntity(id)(entities))

  return items
}

/**
 * TODO - rename to getResult or fetchedItem - distinguish different getItem situations
 *
 * @param resourceName
 * @returns {function(resourcesRoot)}
 */
export function getItem(resourceState, defaultValue = {}) {
  const entities = getEntities(resourceState)

  return getEntity(getItemId(resourceState))(entities) || defaultValue
}
