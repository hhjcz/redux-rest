/** Created by hhj on 2/1/16. */
import { expect } from 'chai'
import createRest from '../createRest'
import { generateSubState } from '../utils'

describe('createRest', () => {

  let reducer
  let rest
  const nullResponse = {}
  const someEndpoint = {}
  someEndpoint.toObject = () => someEndpoint

  const fetch = () => Promise.resolve(nullResponse)

  const getState = () => generateSubState({ someEndpoint })

  const dispatch = action => {
    if (typeof action === 'function') return action({ dispatch, getState })
    if (action.type === '@@my-rest/SOME_ENDPOINT_SUCCESS') {
      expect(action.data).not.to.be.undefined // eslint-disable-line no-unused-expressions
    }
    const initialState = reducer(getState(), {})
    reducer(initialState, action)

    return action
  }

  beforeEach(() => {
    const config = {
      selectResourcesRoot: (state) => state.resources,
      resources: { someEndpoint: { url: '/someUrl' } }
    }
    const depsContainer = { fetch, dispatch }
    rest = createRest(config, depsContainer)
    reducer = rest.reducer
  })

  it('should create basic object', () => {
    expect(typeof rest).to.equal('object')
    expect(typeof rest.actions).to.equal('object')
    expect(typeof rest.reducer).to.equal('function')
    expect(typeof rest.use).to.equal('function')
  })

  it('should create actions', () => {
    const { actions, reducer } = rest
    expect(typeof actions.someEndpoint.fetchCollection).to.equal('function')
    expect(typeof reducer).to.equal('function')
  })

  it('should use provided resource', () => {
    dispatch(rest.actions.someEndpoint.fetchCollection())
  })
})
