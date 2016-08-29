/** Created by hhj on 2/3/16. */
import { expect } from 'chai'
import { actionPrefix } from '../../constants'
import { actionTypesFor } from '../actionTypesFor'

describe('actionTypesFor', () => {

  it('should generate async action types', () => {
    const actionTypes = actionTypesFor('someResource')
    expect(typeof actionTypes.fetchIdsRequested).to.equal('string')
    expect(typeof actionTypes.fetchCollectionRequested).to.equal('string')
    expect(typeof actionTypes.fetchCollectionByIdsRequested).to.equal('string')
    expect(typeof actionTypes.fetchOneRequested).to.equal('string')
    expect(typeof actionTypes.createSuccess).to.equal('string')
    expect(typeof actionTypes.updateError).to.equal('string')
    expect(typeof actionTypes.destroySuccess).to.equal('string')
    expect(actionTypes.destroySuccess).to.equal(`${actionPrefix}/SOME_RESOURCE/DESTROY_SUCCESS`)
  })

  it('should generate sync action types', () => {
    const actionTypes = actionTypesFor('someResource')
    expect(typeof actionTypes.gotoPage).to.equal('string')
    expect(actionTypes.gotoPage).to.equal(`${actionPrefix}/SOME_RESOURCE/GOTO_PAGE`)
    expect(actionTypes.clearEntities).to.equal(`${actionPrefix}/SOME_RESOURCE/CLEAR_ENTITIES`)
  })

})
