/** Created by hhj on 8/29/16. */
/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import createItemsReducer from '../itemsReducer'
import { InitialState } from '../InitialState'

describe('createItemsReducer', () => {
  const initialState = InitialState.items

  const itemsReducer = createItemsReducer()
  const fetchedItems1 = [
    { id: 66, name: 'someName66' },
    { id: 77, name: 'someName77' }
  ]
  const fetchedItems2 = [
    { id: 66, name: 'someChangedName66' },
    { id: 88, name: 'someName88' }
  ]

  it('should map ids to items', () => {
    const state = itemsReducer(fetchedItems1)(initialState)
    // expect(state.items).to.be.instanceOf(List)
    expect(state.items.toArray()).to.deep.equal([66, 77])
  })

  it('should map entities', () => {
    const state = itemsReducer(fetchedItems1)(initialState)

    expect(state.entities).to.be.instanceOf(Map)
    expect(state.entities.toObject()).to.deep.equal({
      '66': { id: 66, name: 'someName66' },
      '77': { id: 77, name: 'someName77' }
    })
    expect(state.items.toArray()).to.deep.equal([66, 77])
  })

  it('should merge with existing entities', () => {
    let state = itemsReducer(fetchedItems1)(initialState)
    state = itemsReducer(fetchedItems2)(state)

    expect(state.entities).to.be.instanceOf(Map)
    expect(state.entities.toObject()).to.deep.equal({
      '66': { id: 66, name: 'someChangedName66' },
      '77': { id: 77, name: 'someName77' },
      '88': { id: 88, name: 'someName88' }
    })
    expect(state.items.toArray()).to.deep.equal([66, 88])
  })

  it('should map with custom id field', () => {
    const itemsReducer = createItemsReducer(x => x, x => x, 'name')
    const state = itemsReducer(fetchedItems1)(initialState)
    expect(state.entities.toObject()).to.deep.equal({
      someName66: { id: 66, name: 'someName66' },
      someName77: { id: 77, name: 'someName77' },
    })
  })
})


describe('clearEntities', () => {

  it('should clear entities', () => {
    const fetchedItems1 = [
      { id: 66, name: 'someName66' },
      { id: 77, name: 'someName77' }
    ]
    const state = createItemsReducer()(fetchedItems1)(initialState)
    expect(state.entities).to.be.instanceOf(Map)
    expect(state.entities.toObject()).to.deep.equal({
      '66': { id: 66, name: 'someName66' },
      '77': { id: 77, name: 'someName77' }
    })
    const nextState = reduceHelpers.clearEntities(state)
    expect(nextState.entities).to.be.instanceOf(Map)
    expect(nextState.entities.toObject()).to.deep.equal({})
  })
})
