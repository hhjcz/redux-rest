/** Created by hhj on 12/30/15. */
import React, { PropTypes } from 'react'
import { Record, Map } from 'immutable'
import Bunka from './Bunka'

export default class Radka extends React.Component {
  static propTypes = {
    model: PropTypes.oneOfType([PropTypes.object, PropTypes.instanceOf(Record)]).isRequired,
    columns: PropTypes.oneOfType([PropTypes.array, PropTypes.instanceOf(Map)]).isRequired,
    pozice: PropTypes.number,
    highlighted: PropTypes.bool,
  };

  static defaultProps = {
    model: {},
    columns: [],
  }

  render() {
    const { model, columns, pozice, highlighted } = this.props
    const shadowedClass = model.deletedAt != null ? 'shadowed' : ''
    const highlightedClass = highlighted ? 'highlighted' : ''
    const title = model.deletedAt != null ? `${model.name} deleted at ${model.deletedAt}` : model.name || ''

    return (
      <div title={title} className={`myTableRow ${highlightedClass} ${shadowedClass}`}>
        {
          columns.map(col => {    // eslint-disable-line arrow-body-style
            return col.visible ?
              <Bunka column={col} model={model} pozice={pozice} key={col.name} />
              : null
          })
        }
      </div>
    )
  }
}
