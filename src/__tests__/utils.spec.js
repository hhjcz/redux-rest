/** Created by hhj on 1/29/16. */
import { expect } from 'chai'
import { List } from 'immutable'
import { revive } from '../reducers/reduceHelpers'
import { getSubState, getItems, getItem, generateSubState, getIdAtCursor } from '../utils'

describe('rest utils', () => {

  describe('getSubState', () => {

    it('should get this substate using function', () => {
      const subState = { someVariable: 'someValue' }
      const getState = () => generateSubState({ someSubState: subState })
      const getThisSubState = getSubState('someSubState')
      expect(getThisSubState(getState)).to.equal(subState)
    })

    it('should get this substate from object', () => {
      const subState = { someVariable: 'someValue' }
      const getState = generateSubState({ someSubState: subState })
      const getThisSubState = getSubState('someSubState')
      expect(getThisSubState(getState)).to.equal(subState)
    })

  })

  describe('getItems', () => {
    let resourceState
    beforeEach(() => {
      resourceState = revive({
        items: [66, 77],
        item: 66,
        entities: { 66: { id: 66, name: 'name66' }, 77: { id: 77, name: 'name77' } }
      })
    })

    it('should handle empty resource', () => {
      const items = getItems()
      expect(items).to.equal(List())
    })

    it('should get items from resource', () => {
      const items = getItems(resourceState)
      expect(items).to.be.instanceOf(List)
      expect(items.toArray()).to.deep.equal([{ id: 66, name: 'name66' }, { id: 77, name: 'name77' }])
    })
  })

  describe('getItem', () => {
    let resourceState
    beforeEach(() => {
      resourceState = revive({
        items: [66, 77],
        item: 66,
        entities: { 66: { id: 66, name: 'name66' }, 77: { id: 77, name: 'name77' } }
      })
    })

    it('should handle empty resource', () => {
      const item = getItem()
      expect(item).to.deep.equal({})
    })

    it('should get items from resource', () => {
      const item = getItem(resourceState)
      expect(item).to.deep.equal({ id: 66, name: 'name66' })
    })
  })

  describe('getIdAtCursor', () => {
    let resourceState
    beforeEach(() => {
      resourceState = revive({
        ids: [66, 77, 88, 99],
        items: [66, 77],
        item: 66,
        entities: { 66: { id: 66, name: 'name66' }, 77: { id: 77, name: 'name77' } },
        pagination: { cursorAt: 3 },
      })
    })

    it('should get id of item at cursor', () => {
      const id = getIdAtCursor(resourceState)
      expect(id).to.equal(88)
    })
  })

})
