/** Created by hhj on 2/15/16. */
import { expect } from 'chai'

import serializeParamsToUrl from '../serializeParamsToUrl'

describe('rest library serializeParamsToUrl', () => {

  it('should serialize main params', () => {
    expect(serializeParamsToUrl('/endpoint/:id', { id: 666 })).to.equal('/endpoint/666')
    expect(serializeParamsToUrl('/endpoint/(:id)', { id: 666 })).to.equal('/endpoint/666')
  })

  it('should serialize nested params', () => {
    expect(serializeParamsToUrl('/endpoint/:id/nested/:nid', {
      id: 666,
      nid: 777
    })).to.equal('/endpoint/666/nested/777')
  })

  it('should serialize extra params', () => {
    expect(serializeParamsToUrl('/endpoint/:id/nested/:nid', {
      id: 666,
      nid: 777,
      extra1: 888,
      extra2: 999
    })).to.equal('/endpoint/666/nested/777?extra1=888&extra2=999')
  })

  it('should remove unused params', () => {
    expect(serializeParamsToUrl('/endpoint/:id', {})).to.equal('/endpoint')
    expect(serializeParamsToUrl('/endpoint/(:id)', {})).to.equal('/endpoint')
    expect(serializeParamsToUrl('/endpoint/:id/nested/:nid', {
      id: 666,
      extra1: 888,
      extra2: 999
    })).to.equal('/endpoint/666/nested?extra1=888&extra2=999')
    expect(serializeParamsToUrl('/endpoint/(:id)/nested/(:nid)', {
      id: 666,
      extra1: 888,
    })).to.equal('/endpoint/666/nested?extra1=888')
  })

  it('should keep passed params', () => {
    expect(serializeParamsToUrl('/endpoint/:id/nested/:nid?extra3=111', {
      id: 666,
      nid: 777,
      extra1: 888,
      extra2: 999
    })).to.equal('/endpoint/666/nested/777?extra1=888&extra2=999&extra3=111')
  })

})
