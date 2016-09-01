/** Created by hhj on 8/30/16. */
/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import { makeInitialState } from '../../reducers/InitialState'
import { selectItemId, selectCollectionIds, selectCollectionIdsStatic, selectIdAtCursor } from '../ids'

describe('ids selectors', () => {

  const resourceState = makeInitialState({
    itemId: 66,
    collectionIds: [1, 2, 3, 4],
    collectionIdsStatic: [5, 6, 7, 8],
    pagination: { cursorAt: 3 },
  })

  it('selects item id', () => {
    const ids = selectItemId(resourceState)
    expect(ids).to.deep.equal(66)
  })

  it('selects collection ids', () => {
    const ids = selectCollectionIds(resourceState)
    expect(ids.toArray()).to.deep.equal([1, 2, 3, 4])
  })

  it('selects static collection ids', () => {
    const ids = selectCollectionIdsStatic(resourceState)
    expect(ids.toArray()).to.deep.equal([5, 6, 7, 8])
  })


  it('should get id of item at cursor', () => {
    const id = selectIdAtCursor(resourceState)
    expect(id).to.equal(7)
  })
})
