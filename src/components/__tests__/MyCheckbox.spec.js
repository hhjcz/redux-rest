/** Created by hhj on 8/12/16. */
/* eslint-disable no-unused-expressions, no-unused-vars, import/no-extraneous-dependencies */
import { expect } from 'chai'
import sinon from 'sinon'
import React from 'react'
import sd from 'skin-deep'
import MyCheckbox from '../MyCheckbox'

describe('lib MyCheckbox component', () => {
  const shallowRender = (props) => sd.shallowRender(React.createElement(MyCheckbox, props))

  it('should render with default props', () => {
    const tree = shallowRender()
    expect(tree.type).to.equal('div')
  })

})
