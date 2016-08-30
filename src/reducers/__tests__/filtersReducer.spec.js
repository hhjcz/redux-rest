/** Created by hhj on 8/29/16. */
/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import actionTypesFor from '../../actions/actionTypesFor'
import { makeInitialState } from '../InitialState'
import createReducer from '../filtersReducer'

describe('createFiltersReducer', () => {

  it('creates reducer', () => {
    const reducer = createReducer()
    expect(typeof reducer).to.equal('function')
  })

  describe('filtersReducer', () => {
    let reducer
    let initialState
    const resourceName = 'fooResource'
    const actionTypes = actionTypesFor(resourceName)
    const idField = 'id'

    beforeEach(() => {
      initialState = makeInitialState().filters
      reducer = createReducer(actionTypes, idField)
    })

    it('handles unknown action', () => {
      const action = { type: 'unknown_action' }
      const nextState = reducer(initialState, action)
      expect(nextState).to.equal(initialState)
    })

    it('handles empty action data', () => {
      const action = { type: actionTypes.filterChange }
      const nextState = reducer(initialState, action)
      expect(nextState).to.equal(initialState)
    })

  })
})
