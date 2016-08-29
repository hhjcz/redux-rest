/** Created by hhj on 7/14/16. */
/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import { createAuthActions, AUTHENTICATION_REQUIRED } from './authActions'

describe('rest lib authActions', () => {
  let passedUrl
  let passedOptions

  const mockedFetch = (url, options) => {
    passedUrl = url
    passedOptions = options
    return Promise.resolve({ response: {} })
  }
  const depsContainer = { fetch: mockedFetch }

  it('should create auth action creators', () => {
    const authActions = createAuthActions(depsContainer)
    expect(authActions.authenticationRequired()).to.deep.equal({ type: AUTHENTICATION_REQUIRED })
    expect(typeof authActions.login).to.equal('function')
    expect(typeof authActions.logout).to.equal('function')
  })

  it('should send login correst request', () => {
    const authActions = createAuthActions(depsContainer)
    authActions.login('someEmail', 'somePassword')({ dispatch: x => x })
    expect(passedUrl).to.equal('/auth/login')
    expect(passedOptions.body).to.deep.equal(JSON.stringify({ email: 'someEmail', password: 'somePassword' }))
    expect(passedOptions.method).to.equal('POST')
  })

})
