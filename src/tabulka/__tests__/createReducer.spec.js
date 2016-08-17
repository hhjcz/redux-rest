/** Created by hhj on 5/31/16. */
/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import { Record, Map } from 'immutable'
import { Column } from '../Column'
import { actionCreatorsFor } from '../actionCreatorsFor'
import createReducer from '../createReducer'

describe('lib tabulka createReducer', () => {

  const initialColumns = Map({ id: new Column({ name: 'id', caption: 'ID', width: 66 }) })
  const tableName = 'someTable'
  const reducer = createReducer(tableName, initialColumns)
  const actions = actionCreatorsFor(tableName)

  let state
  const getState = () => {
  }

  const dispatch = action => {
    if (typeof action === 'function') return action({ dispatch, getState })
    const initialState = reducer()
    state = reducer(initialState, action)

    return action
  }

  it('should create reducer', () => {
    const reducer = createReducer('someTable', initialColumns)
    expect(typeof reducer).to.equal('function')
  })

  it('should show/hide columns', () => {
    dispatch(actions.hideColumn('id'))
    expect(state).to.be.instanceOf(Record)
    expect(state.columns.toObject().id.visible).to.equal(false)

    dispatch(actions.showColumn('id'))
    expect(state.columns.toObject().id.visible).to.equal(true)
  })

  it('should set column width', () => {
    dispatch(actions.setColumnWidth('id', 66))
    expect(state).to.be.instanceOf(Record)
    expect(state.columns.toObject().id.width).to.equal(66)
  })

  it('should set default column width', () => {
    dispatch(actions.setColumnWidth('id'))
    expect(state).to.be.instanceOf(Record)
    expect(state.columns.toObject().id.width).to.equal(initialColumns.get('id').width)
  })

})
