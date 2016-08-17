/** Created by hhj on 20.12.15. */
/* eslint-disable no-case-declarations */
import { Record } from 'immutable'
import { Column } from './Column'
import { actionTypesFor, actionAliases } from './actionTypesFor'

function createReducer(tableName, initialColumns) {
  if (initialColumns === undefined) throw new Error('initialColumns must be specified in table createReducer()')

  const actionTypes = actionTypesFor(tableName)
  const InitialState = Record({ columns: initialColumns })

  const revive = (state = {}, initialState = new InitialState({})) => {
    const { columns } = state
    const mergeObj = {}
    if (columns) mergeObj.columns = columns

    return initialState.merge(mergeObj);
  }

  return function reducer(state = {}, action) {
    if (!(state instanceof InitialState)) {
      return revive()
    }

    switch (action.type) {
      case actionTypes[actionAliases.COLUMN_VISIBILITY]:
        return state.update('columns', columns =>
          columns.update(action.columnName, column =>
            new Column({ ...column.toObject(), visible: action.visible })
          )
        )

      case actionTypes[actionAliases.SET_COLUMN_WIDTH]:
        return state.update('columns', columns =>
          columns.update(action.columnName, column =>
            new Column({
              ...column.toObject(),
              width: action.width !== null ? action.width : initialColumns.get(action.columnName).width || 1
            })
          )
        )

      default:
        return state
    }
  }
}

export default createReducer
