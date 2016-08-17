/** Created by hhj on 20.12.15. */
import { actionTypesFor, actionAliases } from './actionTypesFor'

export function actionCreatorsFor(tableName) {
  const actionTypes = actionTypesFor(tableName)

  const setColumnVisibility = (columnName, visible) => ({
    type: actionTypes[actionAliases.COLUMN_VISIBILITY],
    columnName,
    visible
  })

  const showColumn = columnName => setColumnVisibility(columnName, true)

  const hideColumn = columnName => setColumnVisibility(columnName, false)

  const setColumnWidth = (columnName, width = null) => ({
    type: actionTypes[actionAliases.SET_COLUMN_WIDTH],
    columnName,
    width
  })

  return {
    setColumnVisibility,
    showColumn,
    hideColumn,
    setColumnWidth,
  }
}

export default actionCreatorsFor
