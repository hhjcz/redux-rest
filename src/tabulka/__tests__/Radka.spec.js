/** Created by hhj on 1/4/16. */
import { expect } from 'chai'
import React from 'react'
import sd from 'skin-deep'
import { Map, Record } from 'immutable'
import Radka from '../Radka'

describe('lib tabulka Radka component', () => {

  const shallowRender = props => sd.shallowRender(React.createElement(Radka, props))

  it('should render with default props', () => {
    const tree = shallowRender()
    expect(tree.type).to.equal('div')
    expect(tree.props.title).to.equal('')
  })

  it('should render child elements', () => {
    const columns = Map({
      prvni: { name: 'prvni', visible: true },
      druhy: { name: 'druhy', visible: true },
    })
    const model = new Record({})({})

    const tree = shallowRender({ model, columns, pozice: 66 })

    const children = tree.everySubTree('Bunka')
    expect(children.length).to.equal(2)
    expect(children[0].props.model).to.deep.equal(model)
    expect(children[0].props.pozice).to.deep.equal(66)
  })

})
