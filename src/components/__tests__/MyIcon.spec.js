/** Created by hhj on 3/16/16. */
/* eslint-disable no-unused-expressions, no-unused-vars, import/no-extraneous-dependencies */
import { expect } from 'chai'
import React from 'react'
import sd from 'skin-deep'
import MyIcon from '../MyIcon'

describe('lib MyIcon component', () => {
  let tree
  const shallowRender = (props) => sd.shallowRender(React.createElement(MyIcon, props))


  it('should render with default props', () => {
    const tree = shallowRender()
    expect(tree.props.color).to.equal('white')
    expect(tree.props.style).to.deep.equal({ verticalAlign: 'middle', fontSize: '20px' })
  })

  it('should pass props to FontIcon', () => {
    const tree = shallowRender({
      children: 'circle',
      someProp: 'someValue',
      color: 'someColor',
      style: { someStyle: 'someStyleValue' }
    })
    expect(tree.props.someProp).to.equal('someValue')
    expect(tree.props.color).to.equal('someColor')
    expect(tree.props.style).to.deep.equal({
      verticalAlign: 'middle',
      someStyle: 'someStyleValue',
      fontSize: '20px'
    })
  })

})
