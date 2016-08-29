/** Created by hhj on 2/11/16. */
/* eslint-disable no-unused-expressions, no-unused-vars, import/no-extraneous-dependencies */
import { expect } from 'chai'
import nock from 'nock'
import createFetch from '../createFetch'
import createResource from '../createResource'

describe('createRest library createResource', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('should create resource', () => {
    const resource = createResource('someResource')
    expect(typeof resource).to.equal('object')
    expect(typeof resource.fetchCollection).to.equal('function')
  })

  it('should return proper response as a promise', () => {
    const fetch = () => Promise.resolve({})
    const resource = createResource('someResource', {}, { fetch })
    return resource.fetchOne({}).executeFetch().then(response => {
      expect(response).to.have.property('data')
      expect(response).to.have.property('meta')
    })
  })

  it('should throw error', () => {
    const fetch = () => Promise.reject('Nejaka chyba api')
    const resource = createResource('someResource', {}, { fetch })
    return resource.fetchOne({}).executeFetch().catch(error => {
      expect(error).to.be.instanceOf(Error)
    })
  })

  it('should handle real response', () => {
    const serverBaseUrl = 'http://example.com'
    const endPoint = '/someEndpoint'
    const fetch = createFetch(serverBaseUrl)
    const expectedResponse = { meta: { page: 66 }, data: ['first'] }
    nock(serverBaseUrl).get(endPoint).reply(200, expectedResponse)

    const resource = createResource('someResource', { url: endPoint }, { fetch })

    return resource.fetchCollection({}).executeFetch().then(response => {
      expect(response).to.have.property('data')
      expect(response.data).to.deep.equal(expectedResponse.data)
      expect(response).to.have.property('meta')
      expect(response.meta.page).to.equal(expectedResponse.meta.page)
    })
  })

  it('should handle real error', () => {
    const serverBaseUrl = 'http://example.com'
    const endPoint = '/someEndpoint'
    const fetch = createFetch(serverBaseUrl)
    nock(serverBaseUrl).get(endPoint).reply(404, { message: 'Not found' })

    const resource = createResource('someResource', { url: endPoint }, { fetch })

    return resource.fetchCollection({}).executeFetch().catch(error => {
      expect(error.message).to.equal('Ajejej, resource error: Not found (status 404), url: /someEndpoint')
    })
  })
})
