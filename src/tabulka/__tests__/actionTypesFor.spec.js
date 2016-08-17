/** Created by hhj on 5/31/16. */
/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import { actionTypesFor, actionAliases } from '../actionTypesFor'

describe('lib tabulka actionTypesFor', () => {

  it('should define action aliases', () => {
    expect(typeof actionAliases).to.equal('object')
    expect(typeof actionAliases.COLUMN_VISIBILITY).to.equal('string')
    expect(typeof actionAliases.SET_COLUMN_WIDTH).to.equal('string')
  })

  it('should generate action types', () => {
    const actionTypes = actionTypesFor('someTable')
    expect(actionTypes[actionAliases.COLUMN_VISIBILITY]).to.equal('@my-table/SOME_TABLE/COLUMN_VISIBILITY')
    expect(actionTypes[actionAliases.SET_COLUMN_WIDTH]).to.equal('@my-table/SOME_TABLE/SET_COLUMN_WIDTH')
  })

})
