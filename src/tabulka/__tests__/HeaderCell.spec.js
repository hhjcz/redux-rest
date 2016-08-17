/** Created by hhj on 1/15/16. */
import { expect } from 'chai'
import React from 'react'
import sd from 'skin-deep'

import HeaderCell from '../HeaderCell'
import { Sort } from '../../Sort'
import { Column } from '../Column'

describe('lib tabulka HeaderCell component', () => {

  const shallowRender = props => sd.shallowRender(React.createElement(HeaderCell, props))

  it('should render', () => {
    const tree = shallowRender({ column: new Column(), sort: new Sort() })
    expect(tree.type).to.equal('div')
  })

})
