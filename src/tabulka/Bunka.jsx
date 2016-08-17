/** Created by hhj on 1/11/16. */
import React, { PropTypes } from 'react'

export default class Bunka extends React.Component {
  static propTypes = {
    column: PropTypes.object.isRequired,
    children: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    model: PropTypes.object.isRequired,
    pozice: PropTypes.number,
  };

  static defaultProps = {
    column: {}
  };

  render() {
    const { column, model, pozice } = this.props
    const content = column.render ? column.render(model, pozice) : null
    return (
      <div className={`myTableRowItem uFlexGrow-${column.width}`} key={column.name}>
        {content}
      </div>
    )
  }
}
