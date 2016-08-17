/** Created by hhj on 5/16/16. */
/* eslint-disable no-unused-expressions, no-unused-vars, import/no-extraneous-dependencies */
import { expect } from 'chai'
import React from 'react'
import sd from 'skin-deep'
import Bunka from '../Bunka'

describe('lib tabulka Bunka component', () => {

  const shallowRender = (props) => sd.shallowRender(React.createElement(Bunka, props))

  it('should render with default props', () => {
    const tree = shallowRender()
    expect(tree.type).to.equal('div')
    // expect(vdom.props.children.type).to.equal('');
  })

  it('should render content with column render callback', () => {
    const tree = shallowRender({
      column: { render: model => `Some ${model.caption} in column` },
      model: { caption: 'model-caption' }
    })
    expect(tree.props.children).to.be.equal('Some model-caption in column')
  })

})
