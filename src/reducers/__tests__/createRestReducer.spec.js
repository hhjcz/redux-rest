/** Created by hhj on 2/1/16. */
/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import { makeInitialState } from '../InitialState'
import createRestReducer from '../createRestReducer'

describe('createRestReducer', () => {
  it('creates reducer function', () => {
    const reducer = createRestReducer()
    expect(typeof reducer).to.equal('function')
  })

  it('passes down actionTypes', () => {
    const actionTypes = { someAction: 'someAction' }
    const reducer = createRestReducer('someResource', {}, actionTypes)
    // TODO - add assertion
  })

  it('passes down itemTransformer & idField', () => {
    const config = {
      itemTransformer: x => x,
      idField: 'someIdField'
    }
    const reducer = createRestReducer('someResource', config)
    // TODO - add assertion
  })


  describe('main reducer', () => {

    const itemId = 66
    const someState = {
      itemId,
      shouldNotGoToState: 666
    }

    it('returns the initial state', () => {
      const reducer = createRestReducer()
      const initialState = reducer(undefined, {})
      expect(initialState).to.deep.equal(makeInitialState())
    })

    it('accepts default state from config', () => {
      const reducer = createRestReducer('someResource', {
        defaultState: someState
      })
      const initialState = reducer(undefined, {})

      expect(initialState.itemId).to.equal(itemId)
      expect(initialState.shouldNotGoToState).to.be.undefined
      expect(initialState).to.deep.equal(makeInitialState(someState))
    })

    it('merges initially passed state with initial state', () => {
      const reducer = createRestReducer()
      const initialState = reducer(someState, {})
      expect(initialState).to.deep.equal(makeInitialState(someState))

      // passed state has priority
      const reducer2 = createRestReducer('someResource', { defaultState: { itemId: 666 } })
      const initialState2 = reducer2(someState, {})
      expect(initialState).to.deep.equal(makeInitialState(someState))
    })

  })

})
