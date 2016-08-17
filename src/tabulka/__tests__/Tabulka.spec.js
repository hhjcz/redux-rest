/** Created by hhj on 1/4/16. */
import { expect } from 'chai'
import React from 'react'
import { List, Map } from 'immutable'
import sd from 'skin-deep'
import Tabulka from '../Tabulka.jsx'

describe('lib tabulka Tabulka component', () => {

  const shallowRender = props => sd.shallowRender(React.createElement(Tabulka, props))

  it('should render', () => {
    const tree = shallowRender({ items: List(), filters: Map() })
    expect(tree.type).to.equal('div')
  })

})
