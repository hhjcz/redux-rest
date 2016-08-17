/** Created by hhj on 1/14/16. */
/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import sinon from 'sinon'
import React from 'react'
// import ReactDOM from 'react-dom'
// import TestUtils from 'react-addons-test-utils'
import sd from 'skin-deep'
// import { Pagination } from '../../../app/models/Pagination'
import Paginator from '../Paginator'

describe('lib tabulka Paginator component (testing using shallow render)', () => {
  let tree
  let spyChange

  beforeEach(() => {
    spyChange = sinon.spy()
    tree = sd.shallowRender(React.createElement(Paginator, {
      pagination: { page: 66, perPage: 666 },
      onPageChange: spyChange,
      debounce: 0,
    }))
  })

  it('should render', () => {
    expect(tree.type).to.equal('div')
  })

  it('should call page change callback', () => {
    tree.subTree('Pagination').props.onSelect(77)
    expect(spyChange).to.have.been.calledWith(77)
  })

  it('should no call callback when on target page', () => {
    tree.subTree('Pagination').props.onSelect(66)
    expect(spyChange).to.not.have.been.called
  })

})

// describe('lib tabulka Paginator component (testing using real DOM)', () => {
//   beforeEach(() => {
//     this.component = TestUtils.renderIntoDocument(
//       <Paginator
//         pagination={new Pagination()}
//         onPageChange={function(page) { console.log('page: ', page) }}
//         onPerPageChange={function(perPage) { console.log(perPage) }}
//       />
//     )
//     this.renderedDOM = () => ReactDOM.findDOMNode(this.component)
//     console.log(this.component)
//   })

// it('should render', () => {
// })

// })
