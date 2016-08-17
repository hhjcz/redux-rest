/** Created by hhj on 3/30/16. */
import { expect } from 'chai'
import React from 'react'
import sd from 'skin-deep'
import FetchIndicator from '../FetchIndicator'

describe('umistovani FetchIndicator component', () => {
  let tree

  const shallowRender = (props) => {
    tree = sd.shallowRender(React.createElement(FetchIndicator, props))
  }

  it('should render with default props', () => {
    shallowRender()
    expect(tree.type).to.equal('div')
    // expect(vdom.props.children.type).to.equal('');
  })

})
