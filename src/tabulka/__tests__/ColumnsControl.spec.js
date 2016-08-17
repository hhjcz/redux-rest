/** Created by hhj on 5/13/16. */
/* eslint-disable no-unused-expressions, no-unused-vars, import/no-extraneous-dependencies */
import { expect } from 'chai'
import sinon from 'sinon'
import React from 'react'
import sd from 'skin-deep'
import { Map } from 'immutable'
import ColumnsControl from '../ColumnsControl'

describe('lib tabulka ColumnsControl component', () => {

  const shallowRender = props => sd.shallowRender(React.createElement(ColumnsControl, props))
  const columnsFixture = Map({
    prvni: { name: 'prvni', visible: false },
    druhy: { name: 'druhy', visible: true },
  })

  it('should render with default props', () => {
    const tree = shallowRender()
    expect(tree.type).to.equal('div')
  })

  it('should render column controls', () => {
    const tree = shallowRender({ columns: columnsFixture })

    tree.everySubTree('Button').forEach(item => {
      expect(item.getRenderOutput().key).to.be.defined
      const content = item.props.children
      expect(content).to.equal(columnsFixture.get(content).name)
    })
  })

  it('should call passed callback', () => {
    const setColumnVisibility = sinon.spy()

    const tree = shallowRender({ setColumnVisibility, columns: columnsFixture })
    tree.everySubTree('Button').forEach(item => {
      item.props.onClick()
    })
    expect(setColumnVisibility).to.have.been.calledTwice
    expect(setColumnVisibility).to.have.been.calledWith('prvni', true)
    expect(setColumnVisibility).to.have.been.calledWith('druhy', false)
  })

})
