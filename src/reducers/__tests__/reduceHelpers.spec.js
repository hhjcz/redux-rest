/** Created by hhj on 4/12/16. */
/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import { List, Map } from 'immutable'
import { InitialState, revive } from '../InitialState'

describe('reduceHelpers', () => {
  let initialState
  beforeEach(() => {
    initialState = new InitialState()
  })

  describe('revive', () => {

    it('should revive empty state', () => {
      const state = revive()
      expect(state).to.be.instanceOf(InitialState)
    })

    it('should revive state', () => {
      const state = revive({
        items: [66, 77],
        item: 66,
        entities: { 66: { id: 66, name: 'name66' }, 77: { id: 77, name: 'name77' } }
      })
      expect(state).to.be.instanceOf(InitialState)
      expect(state.items).to.equal(List([66, 77]))
      expect(state.item).to.equal(66)
      expect(state.entities.get('66')).to.deep.equal({ id: 66, name: 'name66' })
    })

  })



})
