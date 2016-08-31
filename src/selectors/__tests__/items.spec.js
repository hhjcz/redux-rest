/** Created by hhj on 8/31/16. */
/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import { List } from 'immutable'
import { makeInitialState } from '../../reducers/InitialState'
import { getItems, getItem } from '../items'

describe('items selectors', () => {

  describe('getItems', () => {
    let resourceState
    beforeEach(() => {
      resourceState = makeInitialState({
        collectionIds: [66, 77],
        itemId: 66,
        entities: { 66: { id: 66, name: 'name66' }, 77: { id: 77, name: 'name77' } }
      })
    })

    it('should handle empty resource state', () => {
      let items = getItems()
      expect(items).to.equal(List())
      items = getItems(null)
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
      resourceState = makeInitialState({
        collectionIds: [66, 77],
        itemId: 66,
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

})
