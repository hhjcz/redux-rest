/** Created by hhj on 8/30/16. */
/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import { makeInitialState } from '../../reducers/InitialState'
import { getResourcesRoot, getResourceWithItems } from '../index'

describe('resources selectors', () => {
  const resource1 = { foo1: 'foo1' }
  const resource3 = makeInitialState({
    itemId: 2,
    collectionIds: [1, 3],
    entities: { 1: { foo: 'foo' }, 2: { bar: 'bar' }, 3: { baz: 'baz' } }
  })
  const state = {
    resource1,
    resource3,
  }

  it('selects resource', () => {
    const resource1State = getResourceWithItems(state => state)('resource1')(state)
    expect(resource1State.foo1).to.deep.equal('foo1')
  })

  it('selects with inserted items', () => {
    const resource3 = getResourceWithItems(state => state)('resource3')(state)

    const expectedItem = { bar: 'bar' }
    const expectedItems = [{ foo: 'foo' }, { baz: 'baz' }]

    expect(resource3.itemId).to.equal(2)
    expect(resource3.collectionIds.toArray()).to.deep.equal([1, 3])
    expect(resource3.item).to.deep.equal(expectedItem)
    expect(resource3.items.toArray()).to.deep.equal(expectedItems)
  })

})
