/** Created by hhj on 4/19/16. */
/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import { createStore, applyMiddleware, compose } from 'redux'
import myMiddleware from '../myMiddleware'

describe('lib myMiddleware', () => {
  let store
  const initialState = {}
  const deps = { someDependency: 'SOME_DEP' }
  const reducer = (state = {}, action) => ({ ...state, action })

  const plainAction = { type: 'SOME_ACTION' }

  const complexAction = ({ dispatch, someDependency }) => {
    expect(someDependency).to.equal('SOME_DEP')
    return dispatch(plainAction)
  }

  beforeEach(() => {
    store = compose(
      applyMiddleware(myMiddleware(deps))
    )(createStore)(reducer, initialState)
  })

  it('should dispatch plain plainAction', () => {
    expect(store.dispatch(plainAction)).to.equal(plainAction)
  })

  it('should dispatch function', () => {
    expect(store.dispatch(complexAction)).to.equal(plainAction)
  })

  it('should allow multiple dispatch', () => {
    expect(store.dispatch(store.dispatch(store.dispatch(plainAction)))).to.equal(plainAction)
    expect(store.dispatch(store.dispatch(store.dispatch(complexAction)))).to.equal(plainAction)
  })

})
