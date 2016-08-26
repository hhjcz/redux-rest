/** Created by hhj on 12/18/15. */
import { expect } from 'chai'
import Pagination, { setPage, setPageSize } from '../Pagination'

describe('pagination', () => {

  it('should set page', () => {
    const state = new Pagination({ page: 1, perPage: 666, total: 6666, totalPages: 6 })
    const nextState = setPage(state, 6)

    expect(nextState).to.equal(
      new Pagination({ page: 6, perPage: 666, total: 6666, totalPages: 6 })
    )
    expect(state).to.equal(
      new Pagination({ page: 1, perPage: 666, total: 6666, totalPages: 6 })
    )
  })

  it('should set page size', () => {
    const state = new Pagination({ page: 1, perPage: 666, total: 6666, totalPages: 6 })
    const nextState = setPageSize(state, 777)

    expect(nextState).to.equal(
      new Pagination({ page: 1, perPage: 777, total: 6666, totalPages: 6 })
    )
    expect(state).to.equal(
      new Pagination({ page: 1, perPage: 666, total: 6666, totalPages: 6 })
    )
  })

})
