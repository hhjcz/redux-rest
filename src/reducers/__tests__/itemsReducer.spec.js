/** Created by hhj on 8/29/16. */
/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import actionTypesFor from '../../actions/actionTypesFor'
import { makeInitialState } from '../InitialState'
import createReducer from '../itemsReducer'

describe('createItemsReducer', () => {

  it('creates reducer', () => {
    const reducer = createReducer()
    expect(typeof reducer).to.equal('function')
  })

  describe('itemsReducer', () => {
    let reducer
    let initialState
    const resourceName = 'fooResource'
    const actionTypes = actionTypesFor(resourceName)
    const idField = 'id'

    const fetchedItems1 = [
      { id: 66, name: 'someName66' },
      { id: 77, name: 'someName77' }
    ]
    const fetchedItems2 = [
      { id: 66, name: 'someChangedName66' },
      { id: 88, name: 'someName88' }
    ]

    beforeEach(() => {
      initialState = makeInitialState().items
      reducer = createReducer(actionTypes, idField)
    })

    it('handles unknown action', () => {
      const action = { type: 'unknown_action' }
      const nextState = reducer(initialState, action)
      expect(nextState).to.equal(initialState)
      expect(nextState).to.deep.equal(initialState)
    })

    it('handles empty action data', () => {
      const action = { type: actionTypes.fetchCollectionSuccess }
      const nextState = reducer(initialState, action)
      expect(nextState).to.equal(initialState)
      expect(nextState).to.deep.equal(initialState)
    })

    it('maps items to ids', () => {
      const action = { type: actionTypes.fetchCollectionSuccess, data: fetchedItems1 }
      const state = reducer(initialState, action)
      expect(state.toArray()).to.deep.equal([66, 77])
    })

    it('overrides previous items', () => {
      const action = { type: actionTypes.fetchCollectionSuccess, data: fetchedItems1 }
      const state = reducer(initialState, action)
      expect(state.toArray()).to.deep.equal([66, 77])

      const action2 = { type: actionTypes.fetchCollectionSuccess, data: fetchedItems2 }
      const state2 = reducer(state, action2)
      expect(state2.toArray()).to.deep.equal([66, 88])
    })

    it('maps with custom id field', () => {
      const reducer = createReducer(actionTypes, 'name')
      const action = { type: actionTypes.fetchCollectionSuccess, data: fetchedItems1 }
      const state = reducer(initialState, action)
      expect(state.toArray()).to.deep.equal(['someName66', 'someName77'])
    })
  })
})
