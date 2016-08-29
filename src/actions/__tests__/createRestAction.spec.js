/** Created by hhj on 3/15/16. */
/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import createRestAction from '../createRestActions'
import { actionTypesFor } from '../actionTypesFor'
import { actionCreatorsFor } from '../actionCreatorsFor'
import { generateSubState } from '../../utils'

describe('createRestAction', () => {

  const endpointName = 'povidky'
  const config = {
    url: `/${endpointName}/:id`,
    extraParams: { include: 'subresource.subsubresource', otherExtraParam: 'someValue' },
    itemTransformer: item => item,
    defaultState: { someState: { value: 666 } }
  }
  const actionTypes = actionTypesFor(endpointName)
  const actionCreators = actionCreatorsFor(actionTypes)
  const getState = () => generateSubState({ povidky: {} })
  const dispatch = action => {
    if (typeof action === 'function') return action({ dispatch, getState, history: {} })
    return action
  }
  const fetchBuffer = {}
  const fetch = (url, args) => {
    fetchBuffer.url = url
    fetchBuffer.args = args
    return Promise.resolve(url)
  }
  const depsContainer = { fetch, dispatch }

  const actions = createRestAction(endpointName, config, actionCreators, depsContainer)

  it('should create rest actions', () => {
    expect(typeof actions.fetchIds).to.equal('function')
    expect(typeof actions.fetchCollection).to.equal('function')
    expect(typeof actions.fetchCollectionByIds).to.equal('function')
    expect(typeof actions.fetchOne).to.equal('function')
    expect(typeof actions.create).to.equal('function')
    expect(typeof actions.update).to.equal('function')
    expect(typeof actions.destroy).to.equal('function')
  })

  it('should handle params', () => {
    const promise = actions.fetchCollection({ params: { someParam: 'someValue' } })
    const expectedUrl = '/povidky?include=subresource.subsubresource&other_extra_param=someValue&some_param=someValue'  // eslint-disable-line max-len

    expect(fetchBuffer.url).to.equal(expectedUrl)
    expect(fetchBuffer.args.method).to.equal('GET')

    return promise
  })

  it('should handle params & body', () => {
    const promise = actions.update({ params: { someParam: 'someValue' }, body: { someBody: 'someValue' } })  // eslint-disable-line max-len
    const expectedUrl = '/povidky?include=subresource.subsubresource&other_extra_param=someValue&some_param=someValue'  // eslint-disable-line max-len

    expect(fetchBuffer.url).to.equal(expectedUrl)
    expect(fetchBuffer.args.method).to.equal('PATCH')
    expect(fetchBuffer.args.body).to.equal('{"someBody":"someValue"}')

    return promise
  })


  describe('fetchList', () => {
    it('should handle null response', () => actions.fetchCollection())
  })

  describe('fetchOneAt', () => {
    it('should dispatch', () => actions.fetchOneAt(666))
  })

  describe('gotoPage', () => {
    it('should dispatch', () => actions.gotoPage(666))
  })

  describe('setPageSize', () => {
    it('should dispatch', () => actions.setPageSize(66))
  })

  describe('sortChange', () => {
    it('should dispatch', () => actions.sortChange('id'))
  })

  describe('filterChange', () => {
    it('should dispatch', () => actions.filterChange({}))
  })

  describe('generalParamChange', () => {
    it('should dispatch', () => actions.generalParamChange({}))
  })

})
