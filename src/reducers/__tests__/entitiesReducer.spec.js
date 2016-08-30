/** Created by hhj on 8/29/16. */
/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import actionTypesFor from '../../actions/actionTypesFor'
import { makeInitialState } from '../InitialState'
import createReducer from '../entitiesReducer'

describe('createEntitiesReducer', () => {

  it('creates reducer', () => {
    const reducer = createReducer()
    expect(typeof reducer).to.equal('function')
  })

  describe('entitiesReducer', () => {
    let reducer
    let initialState
    const resourceName = 'fooResource'
    const actionTypes = actionTypesFor(resourceName)
    const idField = 'id'
    const itemTransformer = x => x

    const fetchedItems1 = [
      { id: 66, name: 'someName66' },
      { id: 77, name: 'someName77' }
    ]
    const fetchedItems2 = [
      { id: 66, name: 'someChangedName66' },
      { id: 88, name: 'someName88' }
    ]

    beforeEach(() => {
      initialState = makeInitialState().entities
      reducer = createReducer(actionTypes, itemTransformer, idField)
    })

    it('handles unknown action', () => {
      const action = { type: 'unknown_action' }
      const nextState = reducer(initialState, action)
      expect(nextState).to.equal(initialState)
    })

    it('handles empty action data', () => {
      const action = { type: actionTypes.fetchCollectionSuccess }
      const nextState = reducer(initialState, action)
      expect(nextState).to.equal(initialState)
    })

    it('maps entities by ids', () => {
      const action = { type: actionTypes.fetchCollectionSuccess, data: fetchedItems1 }
      const state = reducer(initialState, action)
      expect(state.toObject()).to.deep.equal({
        '66': { id: 66, name: 'someName66' },
        '77': { id: 77, name: 'someName77' }
      })
    })

    it('merges with existing entities', () => {
      const action1 = { type: actionTypes.fetchCollectionSuccess, data: fetchedItems1 }
      const action2 = { type: actionTypes.fetchCollectionSuccess, data: fetchedItems2 }
      let state = reducer(initialState, action1)
      state = reducer(state, action2)

      expect(state.toObject()).to.deep.equal({
        '66': { id: 66, name: 'someChangedName66' },
        '77': { id: 77, name: 'someName77' },
        '88': { id: 88, name: 'someName88' }
      })
    })

    it('maps with custom id field', () => {
      const reducer = createReducer(actionTypes, itemTransformer, 'name')
      const action = { type: actionTypes.fetchCollectionSuccess, data: fetchedItems1 }
      const state = reducer(initialState, action)
      expect(state.toObject()).to.deep.equal({
        someName66: { id: 66, name: 'someName66' },
        someName77: { id: 77, name: 'someName77' },
      })
    })

    it('clears entities', () => {
      const action = { type: actionTypes.fetchCollectionSuccess, data: fetchedItems1 }
      const state = reducer(initialState, action)
      expect(state.toObject()).to.deep.equal({
        '66': { id: 66, name: 'someName66' },
        '77': { id: 77, name: 'someName77' }
      })

      const clerAction = { type: actionTypes.clearEntities }
      const nextState = reducer(state, clerAction)
      expect(nextState.toObject()).to.deep.equal({})
    })
  })
})

