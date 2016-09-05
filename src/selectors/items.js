/** Created by hhj on 8/30/16. */
import { Map } from 'immutable'
import R from 'ramda'
import { selectItemId, selectCollectionIds } from './ids'

const selectEntities = R.curry((resourceState, id) => {
  const entities = resourceState ? resourceState.entities || Map() : Map()

  return entities.get(`${id}`)
})

/**
 * @param resourceState
 * @returns {Array|Iterable<K, *>}
 */
export function selectItems(resourceState) {
  if (resourceState && resourceState.items) return resourceState.items
  const selectEntity = selectEntities(resourceState)
  return selectCollectionIds(resourceState)
    .filter(id => selectEntity(id) !== undefined)
    .map(id => selectEntity(id))
}

/**
 * TODO - rename to getResult or fetchedItem - distinguish different selectItem situations
 *
 * @param resourceName
 * @returns {function(resourcesRoot)}
 */
export function selectItem(resourceState, defaultValue = {}) {
  if (resourceState && resourceState.item) return resourceState.item
  const id = selectItemId(resourceState)
  return selectEntities(resourceState, id) || defaultValue
}
