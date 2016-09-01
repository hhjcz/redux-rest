/** Created by hhj on 8/30/16. */
import { Map } from 'immutable'
import { selectItemId, selectCollectionIds } from './ids'

function selectEntities(resourceState) {
  return resourceState ? resourceState.entities || Map() : Map()
}

function selectEntity(id) {
  return (entities) => entities.get(`${id}`)
}

/**
 * @param resourceState
 * @returns {Array|Iterable<K, *>}
 */
export function selectItems(resourceState) {
  if (resourceState && resourceState.items) return resourceState.items
  const entities = selectEntities(resourceState)
  const items = selectCollectionIds(resourceState)
    .filter(id => selectEntity(id)(entities) !== undefined)
    .map(id => selectEntity(id)(entities))

  return items
}

/**
 * TODO - rename to getResult or fetchedItem - distinguish different selectItem situations
 *
 * @param resourceName
 * @returns {function(resourcesRoot)}
 */
export function selectItem(resourceState, defaultValue = {}) {
  if (resourceState && resourceState.item) return resourceState.item
  const entities = selectEntities(resourceState)

  return selectEntity(selectItemId(resourceState))(entities) || defaultValue
}
