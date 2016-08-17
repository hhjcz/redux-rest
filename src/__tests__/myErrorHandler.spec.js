/** Created by hhj on 3/22/16. */
/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import myErrorHandler from '../myErrorHandler'

describe('lib myErrorHandler', () => {

  it('should handle string error', () => {
    expect(myErrorHandler('test error message')).to.be.undefined
  })

  it('should handle object error', () => {
    expect(myErrorHandler({ message: 'test error message' })).to.be.undefined
  })

})
