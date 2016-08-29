/** Created by hhj on 8/29/16. */
import { Map } from 'immutable'

/**
 * @param actionTypes
 * @param itemTransformer
 * @param idField
 * @returns {entitiesReducer}
 */
export default function createEntitiesReducer(actionTypes, itemTransformer = x => x, idField = 'id') {

  const mergeEntities = (currentEntities, nextEntities = []) => {
    const entitiesById = Map(nextEntities.reduce((result, item) => {
      result[item[idField]] = itemTransformer(item)
      return result
    }, {}))

    return currentEntities.merge(entitiesById)
  }

  return function entitiesReducer(state = Map(), action) {

    const items = action.data

    switch (action.type) {

      case actionTypes.fetchCollectionSuccess:
      case actionTypes.fetchCollectionByIdsSuccess:
      case actionTypes.fetchIdsSuccess:
        return mergeEntities(state, items)

      case actionTypes.clearEntities:
        return Map()

      default:
        return state
    }
  }
}
