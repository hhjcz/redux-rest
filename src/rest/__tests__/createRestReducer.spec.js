/** Created by hhj on 2/1/16. */
import { expect } from 'chai'
import { List } from 'immutable'
import createRestReducer from '../createRestReducer'
import { actionTypesFor } from '../actionTypesFor'
import { InitialState } from '../reduceHelpers'
import Pagination from '../../Pagination'
import Sort from '../../Sort'

describe('createRestReducer', () => {

  it('should return the initial state', () => {
    const reducer = createRestReducer('someEndpoint', { url: 'someUrl' })
    const initialState = reducer({})
    expect(initialState).to.be.instanceOf(InitialState)
  })

  it('should handle empty action', () => {
    const reducer = createRestReducer('someEndpoint', { url: 'someUrl' })
    const initialState = reducer({})
    const state = reducer(initialState, {})
    expect(state).to.be.instanceOf(InitialState)
  })

  describe('sync rest actions reducer', () => {
    const actionTypes = actionTypesFor('someEndpoint')
    const reducer = createRestReducer('someEndpoint', { url: 'someUrl' }, actionTypes)
    const initialState = reducer({
      pagination: new Pagination({ page: 1, perPage: 666, total: 6666, totalPages: 3 }),
      seznamZarizeni: List.of(),
      sort: new Sort()
    })

    it('should handle SET_PAGINATION', () => {
      const pagination = new Pagination({ page: 6, perPage: 66, total: 6666, totalPages: 666 })
      const nextState = reducer(initialState, { type: actionTypes.setPagination, pagination })
      expect(nextState.get('pagination')).to.equal(pagination)
    })

    it('should handle GOTO_PAGE', () => {
      const nextState = reducer(initialState, { type: actionTypes.gotoPage, page: 3 })
      expect(nextState).to.equal(reducer({
        pagination: new Pagination({ page: 3, perPage: 666, total: 6666, totalPages: 3 }),
        seznamZarizeni: initialState.get('seznamZarizeni'),
        sort: initialState.get('sort')
      }))
      expect(initialState).to.equal(reducer({
        pagination: new Pagination({ page: 1, perPage: 666, total: 6666, totalPages: 3 }),
        seznamZarizeni: List.of(),
        sort: initialState.get('sort')
      }))
    })

    it('should handle SORT_CHANGE', () => {
      const nextState = reducer(initialState, { type: actionTypes.sortChange, sortField: 'someColumn' })
      expect(nextState.sort.by).to.equal('someColumn')
      expect(nextState.sort.dir).to.equal(true)

      // assert immutability
      expect(initialState).to.equal(reducer({
        pagination: new Pagination({ page: 1, perPage: 666, total: 6666, totalPages: 3 }),
        seznamZarizeni: List.of(),
        sort: new Sort()
      }))
    })

    it('should reverse sort direction, then clear sort field', () => {
      const state = reducer(initialState, { type: actionTypes.sortChange, sortField: 'someColumn' })
      expect(state.sort.by).to.equal('someColumn')
      expect(state.sort.dir).to.equal(true)

      const nextState = reducer(state, { type: actionTypes.sortChange, sortField: 'someColumn' })
      expect(nextState.sort.by).to.equal('someColumn')
      expect(nextState.sort.dir).to.equal(false)

      const finalState = reducer(nextState, { type: actionTypes.sortChange, sortField: 'someColumn' })
      expect(finalState.sort.by).to.equal('')
    })
  })
})
