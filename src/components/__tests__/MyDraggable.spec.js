/** Created by hhj on 3/2/16. */
/* eslint-disable no-unused-expressions, no-unused-vars, import/no-extraneous-dependencies */
import { expect } from 'chai'
import sinon from 'sinon'
import React from 'react'
import sd from 'skin-deep'
import MyDraggable from '../MyDraggable'

describe('lib MyDraggable component', () => {
  const shallowRender = (props) => sd.shallowRender(React.createElement(MyDraggable, props))

  it('should render with default props', () => {
    const tree = shallowRender()
    expect(tree.type).to.equal('span')
  })

})
