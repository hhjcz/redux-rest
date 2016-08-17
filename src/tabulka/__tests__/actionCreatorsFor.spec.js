/** Created by hhj on 5/31/16. */
/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import { actionCreatorsFor } from '../actionCreatorsFor'

describe('lib tabulka actionCreatorsFor', () => {

  it('should create action creators', () => {
    const actionCreators = actionCreatorsFor('someTable')
    expect(typeof actionCreators.setColumnVisibility).to.equal('function')
    expect(typeof actionCreators.setColumnWidth).to.equal('function')
    expect(typeof actionCreators.showColumn).to.equal('function')
    expect(typeof actionCreators.hideColumn).to.equal('function')
  })

  it('should create valid actions', () => {
    const actionCreators = actionCreatorsFor('someTable')
    expect(actionCreators.setColumnVisibility('someColumn', true)).to.deep.equal({
      columnName: 'someColumn',
      type: '@my-table/SOME_TABLE/COLUMN_VISIBILITY',
      visible: true
    })
    expect(actionCreators.showColumn('someColumn')).to.deep.equal({
      columnName: 'someColumn',
      type: '@my-table/SOME_TABLE/COLUMN_VISIBILITY',
      visible: true
    })
    expect(actionCreators.hideColumn('someColumn')).to.deep.equal({
      columnName: 'someColumn',
      type: '@my-table/SOME_TABLE/COLUMN_VISIBILITY',
      visible: false
    })
    expect(actionCreators.setColumnWidth('someColumn', 66)).to.deep.equal({
      columnName: 'someColumn',
      type: '@my-table/SOME_TABLE/SET_COLUMN_WIDTH',
      width: 66
    })
    expect(actionCreators.setColumnWidth('someColumn')).to.deep.equal({
      columnName: 'someColumn',
      type: '@my-table/SOME_TABLE/SET_COLUMN_WIDTH',
      width: null
    })
  })

})
