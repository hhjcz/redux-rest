/** Created by hhj on 8/12/16. */
/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import sinon from 'sinon'
import React from 'react'
import sd from 'skin-deep'
import Footer from '../Footer'

describe('tabulka Footer component', () => {

  const shallowRender = props => sd.shallowRender(React.createElement(Footer, props))

  it('should render with default props', () => {
    const tree = shallowRender()
    expect(tree.type).to.equal('div')
  })

  it('should handle change of rowCount input', () => {
    const spyChange = sinon.spy()
    const tree = shallowRender({ onRowCountChange: spyChange, debounce: 1 })
    const perPageInput = tree.subTree('#rowCountInput')
    return perPageInput.props.onChange({ target: { value: '66' } }).then(value => {
      expect(spyChange).to.have.been.calledWith(66)
    })
  })

  it('should call rowCount change handler', () => {
    const spyChange = sinon.spy()
    const tree = shallowRender({ onRowCountChange: spyChange, debounce: 0 })
    tree.fillField('#rowCountInput', '77')
    expect(spyChange).to.have.been.calledWith(77)
  })

  it('should set input style to error', () => {
    const tree = shallowRender({ debounce: 0, rowCount: 'abc' })
    const rowCountFormGroup = tree.subTree('#rowCountFG').getRenderOutput()
    expect(rowCountFormGroup.props.validationState).to.equal('error')
  })

})
