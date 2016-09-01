/** Created by hhj on 2/1/16. */
import { expect } from 'chai'
import createRest, {
  createFetch,
  selectResource,
  selectItem,
  selectItems,
  selectIdAtCursor,
  Pagination,
  Sort,
  Filter,
  collectionTypes
} from '../index'


describe('index', () => {

  it('exports default', () => {
    expect(typeof createRest).to.equal('function')
  })

  it('exports utilities', () => {
    expect(typeof createFetch).to.equal('function')
  })

  it('exports selectors', () => {
    expect(typeof selectResource).to.equal('function')
    expect(typeof selectItem).to.equal('function')
    expect(typeof selectItems).to.equal('function')
    expect(typeof selectIdAtCursor).to.equal('function')
  })

  it('exports models', () => {
    expect(typeof Pagination).to.equal('function')
    expect(typeof Sort).to.equal('function')
    expect(typeof Filter).to.equal('function')
    expect(typeof collectionTypes).to.equal('object')
  })

})
