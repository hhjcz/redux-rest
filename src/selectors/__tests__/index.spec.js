/** Created by hhj on 8/30/16. */
/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import { makeInitialState } from '../../reducers/InitialState'
import * as selectors from '../index'

describe('selectors', () => {
  const resource1 = { foo: 'bar' }
  const resource2 = { foo2: 'bar2' }
  const resource3 = makeInitialState({ items: [1, 2, 3] })
  const resources = {
    resource1,
    resource2,
    resource3,
  }
  const state = {
    resources
  }

  it('selects resources root state', () => {
    const rootState = selectors.getResourcesRootState(state)
    expect(rootState).to.deep.equal(resources)
  })

  it('selects resource sub tree', () => {
    const resource1State = selectors.getResourceState(state, 'resource1')
    expect(resource1State).to.deep.equal(resource1)
    const resource3State = selectors.getResourceState(state, 'resource3')
    expect(resource3State).to.deep.equal(resource3)
  })

  it('selects items of resource', () => {
    const items = selectors.getItemsOf(state, 'resource3')
    expect(items).to.deep.equal(resource3.items)
  })

  it('selects items of resource', () => {
    const items = selectors.getItemsOfFP('resource3')(state)
    expect(items).to.deep.equal(resource3.items)
  })

})
