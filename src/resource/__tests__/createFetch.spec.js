/** Created by hhj on 2/12/16. */
/* eslint-disable no-unused-expressions, no-unused-vars, import/no-extraneous-dependencies */
import { expect } from 'chai'
import nock from 'nock'
import createFetch from '../createFetch'

describe('createFetch', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  const baseUrl = 'http://example.com'
  const expectedResponse = { body: { something: 'new' } }

  it('should create resource', () => {
    const fetch = createFetch(baseUrl)
    expect(typeof fetch).to.equal('function')
  })

  it('resource should return response', () => {
    nock(baseUrl).get('/someEndpoint').reply(200, expectedResponse)

    const fetch = createFetch(baseUrl)
    expect(typeof fetch).to.equal('function')

    return fetch('/someEndpoint')
      .then(response => {
        expect(response).to.deep.equal(expectedResponse)
      })
  })

  it('resource should return error', () => {
    nock(baseUrl).get('/someEndpoint').reply(400)

    const fetch = createFetch(baseUrl)
    expect(typeof fetch).to.equal('function')

    return fetch('/someEndpoint')
      .catch(error => {
        expect(error).to.be.instanceOf(Error)
      })
  })
})
