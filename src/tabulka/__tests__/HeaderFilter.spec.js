/** Created by hhj on 1/21/16. */
/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import sinon from 'sinon'
import React from 'react'
import sd from 'skin-deep'

import { Filter } from '../../../app/models/Filter'
import HeaderFilter from '../HeaderFilter'

describe('lib tabulka HeaderFilter component', () => {
  let tree
  let spyOnChange

  beforeEach(() => {
    spyOnChange = sinon.spy()
    tree = sd.shallowRender(React.createElement(HeaderFilter, {
      column: { name: 'someColumn' },
      onFilterChange: spyOnChange,
      debounce: 0
    }))
  })

  it('should render', () => {
    expect(tree.type).to.equal('div')
  })

  it('should call filter change callback', () => {
    tree.fillField('#filterInput', 'someFilterValue')
    expect(spyOnChange).to.have.been.calledOnce
    expect(spyOnChange).to.have.been.calledWith(new Filter({
      name: 'someColumn', value: 'someFilterValue'
    }))
  })

})
