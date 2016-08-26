/** Created by hhj on 2/1/16. */
import { expect } from 'chai'
import createRest, {
  createFetch,
  getItem,
  getItems,
  getSubState,
  Pagination,
  Sort,
  Filter,
  collectionTypes
} from '../index'


describe('rest lib index', () => {

  it('exports default', () => {
    expect(typeof createRest).to.equal('function')
  })

  it('exports utilities', () => {
    expect(typeof createFetch).to.equal('function')
    expect(typeof getItem).to.equal('function')
    expect(typeof getItems).to.equal('function')
    expect(typeof getSubState).to.equal('function')
  })

  it('exports models', () => {
    expect(typeof Pagination).to.equal('function')
    expect(typeof Sort).to.equal('function')
    expect(typeof Filter).to.equal('function')
    expect(typeof collectionTypes).to.equal('object')
  })

})
