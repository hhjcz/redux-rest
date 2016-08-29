/** Created by hhj on 2/3/16. */
import { expect } from 'chai'
import { actionTypesFor } from '../actionTypesFor'
import { actionCreatorsFor } from '../actionCreatorsFor'

describe('actionCreatorsFor', () => {

  let actionTypes
  let actionCreators

  beforeEach(() => {
    actionTypes = actionTypesFor('someResource')
    actionCreators = actionCreatorsFor(actionTypes)
  })

  it('should create async action creators', () => {
    expect(typeof actionCreators.fetchCollectionRequested).to.equal('function')
    expect(typeof actionCreators.fetchCollectionSuccess).to.equal('function')
    expect(typeof actionCreators.fetchCollectionError).to.equal('function')
  })

  it('should create valid async action creators', () => {
    expect(actionCreators.fetchCollectionRequested().type)
      .to.equal(actionTypes.fetchCollectionRequested)
    expect(actionCreators.fetchCollectionSuccess().type)
      .to.equal(actionTypes.fetchCollectionSuccess)
    expect(actionCreators.fetchCollectionError().type)
      .to.equal(actionTypes.fetchCollectionError)
  })

  it('should create sync action creators', () => {
    expect(typeof actionCreators.gotoPage).to.equal('function')
    expect(typeof actionCreators.setPagination).to.equal('function')
    expect(typeof actionCreators.pointCursorTo).to.equal('function')
    expect(typeof actionCreators.setPageSize).to.equal('function')
    expect(typeof actionCreators.sortChange).to.equal('function')
    expect(typeof actionCreators.filterChange).to.equal('function')
    expect(typeof actionCreators.generalParamChange).to.equal('function')
    expect(typeof actionCreators.clearEntities).to.equal('function')
  })

  it('should create valid sync action creators', () => {
    expect(actionCreators.gotoPage({ page: 666 }).type)
      .to.equal(actionTypes.gotoPage)
    expect(actionCreators.gotoPage({ page: 666 }))
      .to.deep.equal({ type: actionTypes.gotoPage, page: 666 })

    expect(actionCreators.setPagination().type)
      .to.equal(actionTypes.setPagination)

    expect(actionCreators.pointCursorTo().type)
      .to.equal(actionTypes.pointCursorTo)

    expect(actionCreators.setPageSize().type)
      .to.equal(actionTypes.setPageSize)
    expect(actionCreators.setPageSize({ perPage: 66 }))
      .to.deep.equal({ type: actionTypes.setPageSize, perPage: 66 })

    expect(actionCreators.sortChange().type)
      .to.equal(actionTypes.sortChange)

    expect(actionCreators.filterChange().type)
      .to.equal(actionTypes.filterChange)

    expect(actionCreators.generalParamChange().type)
      .to.equal(actionTypes.generalParamChange)
    expect(actionCreators.generalParamChange({ someProp: 666 }))
      .to.deep.equal({ type: actionTypes.generalParamChange, someProp: 666 })

    expect(actionCreators.clearEntities().type)
      .to.equal(actionTypes.clearEntities)
  })

})
