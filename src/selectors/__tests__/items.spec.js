/** Created by hhj on 8/31/16. */
/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import { List } from 'immutable'
import { makeInitialState } from '../../reducers/InitialState'
import { selectItems, selectItem } from '../items'

describe('items selectors', () => {

  describe('selectItems', () => {
    let resourceState
    beforeEach(() => {
      resourceState = makeInitialState({
        collectionIds: [66, 77],
        itemId: 66,
        entities: { 66: { id: 66, name: 'name66' }, 77: { id: 77, name: 'name77' } }
      })
    })

    it('handles empty resource state', () => {
      let items = selectItems()
      expect(items).to.equal(List())
      items = selectItems(null)
      expect(items).to.equal(List())
    })

    it('selects items from resource', () => {
      const items = selectItems(resourceState)
      expect(items).to.be.instanceOf(List)
      expect(items.toArray()).to.deep.equal([{ id: 66, name: 'name66' }, { id: 77, name: 'name77' }])
    })
  })

  describe('selectItem', () => {
    let resourceState
    beforeEach(() => {
      resourceState = makeInitialState({
        collectionIds: [66, 77],
        itemId: 66,
        entities: { 66: { id: 66, name: 'name66' }, 77: { id: 77, name: 'name77' } }
      })
    })

    it('handles empty resource', () => {
      const item = selectItem()
      expect(item).to.deep.equal({})
    })

    it('selects item from resource', () => {
      const item = selectItem(resourceState)
      expect(item).to.deep.equal({ id: 66, name: 'name66' })
    })

    it('selects item by id', () => {
      const item = selectItem(resourceState, {}, 77)
      expect(item).to.deep.equal({ id: 77, name: 'name77' })
    })
  })

})
