/** Created by hhj on 2/3/16. */
import snakeCase from 'lodash/snakeCase'

const actionPrefix = '@redux-rest'

function syncAction(resource, action, subAction = null) {
  const upperResource = snakeCase(resource).toUpperCase()
  const upperAction = snakeCase(action).toUpperCase()
  const upperSubAction = subAction ? `_${subAction.toUpperCase()}` : ''

  const type = `${actionPrefix}/${upperResource}/${upperAction}${upperSubAction}`
  const alias = `${action}${subAction || ''}`

  return { type, alias }
}

function asyncSubActions(resource, action) {
  const actionTypes = ['Requested', 'Success', 'Error'].reduce(
    (result, subAction) => {
      const { type, alias } = syncAction(resource, action, subAction)
      /* eslint-disable no-param-reassign */
      result[type] = type
      result[alias] = type

      return result
    }, {})

  return actionTypes
}

/** @typedef  {{
*               fetchCollectionRequested, fetchCollectionSuccess, fetchCollectionError,
*               fetchCollectionByIdsRequested, fetchCollectionByIdsSuccess, fetchCollectionByIdsError,
*               fetchIdsRequested, fetchIdsSuccess, fetchIdsError,
*               fetchCollectionRequested, fetchCollectionSuccess, fetchCollectionError,
*               fetchOneRequested, fetchOneSuccess, fetchOneError,
*               createRequested, createSuccess, createError,
*               updateRequested, updateSuccess, updateError,
*               destroyRequested, destroySuccess, destroyError,
*               gotoPage, setPagination, pointCursorTo, setPageSize,
*               sortChange, filterChange, generalParamChange,
*               clearEntities
*             }} ActionTypes */
/**
 * @param resource
 * @returns {ActionTypes}
 */
export function actionTypesFor(resource) {
  const asyncActionTypes = [
    'fetchCollection', 'fetchCollectionByIds', 'fetchIds',
    'fetchOne', 'create', 'update', 'destroy'
  ].reduce((result, action) => ({
    ...result,
    ...asyncSubActions(resource, action)
  }), {})

  const actionTypes = [
    'gotoPage', 'setPagination', 'pointCursorTo', 'setPageSize',
    'sortChange', 'filterChange', 'generalParamChange',
    'clearEntities'
  ].reduce((result, action) => {
    const { type, alias } = syncAction(resource, action, null)
    result[type] = type
    result[alias] = type
    return result
  }, asyncActionTypes)

  return actionTypes
}

export default actionTypesFor
