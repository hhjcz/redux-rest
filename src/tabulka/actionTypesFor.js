/** Created by hhj on 5/31/16. */
import snakeCase from 'lodash/snakeCase'
import reduce from 'lodash/reduce'

const actionPrefix = '@my-table'
export const actionAliases = {
  COLUMN_VISIBILITY: 'COLUMN_VISIBILITY',
  SET_COLUMN_WIDTH: 'SET_COLUMN_WIDTH'
}

export function actionTypesFor(tableName) {
  const upperTableName = snakeCase(tableName).toUpperCase()

  const actionTypes = reduce(actionAliases, (actionTypes, actionAlias) => {
    actionTypes[actionAlias] = `${actionPrefix}/${upperTableName}/${actionAlias}`
    return actionTypes
  }, {})

  return actionTypes
}

export default actionTypesFor
