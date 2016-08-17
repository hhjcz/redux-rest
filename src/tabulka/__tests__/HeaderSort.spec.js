/** Created by hhj on 4/8/16. */
/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import React from 'react'
import sd from 'skin-deep'
import HeaderSort from '../HeaderSort'

describe('lib tabulka HeaderSort component', () => {

  const shallowRender = props => sd.shallowRender(React.createElement(HeaderSort, props))

  it('should render with default props', () => {
    const tree = shallowRender()
    expect(tree.text()).to.equal('')
  })

  it('should render when column sortable', () => {
    const tree = shallowRender({ column: { sortable: true } })
    expect(tree.type).to.equal('div')
  })

  it('should render nothing when column not sortable', () => {
    const tree = shallowRender({ column: { sortable: false } })
    expect(tree.text()).to.equal('')
  })

})
