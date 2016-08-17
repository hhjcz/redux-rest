/** Created by hhj on 4/8/16. */

import React, { PropTypes } from 'react'

export default class HeaderSort extends React.Component {
  static propTypes = {
    column: PropTypes.object.isRequired,
    sort: PropTypes.object.isRequired,
    onSortChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    column: {},
    sort: {},
  };

  render() {
    const { column, sort, onSortChange } = this.props

    if (!column.sortable) return null

    const arrowDirection = sort.dir ? '-alt' : ''
    const arrowClass =
      sort.by === column.name ? (
        `glyphicon-sort-by-attributes${arrowDirection} active`
      ) : 'glyphicon-sort shadowed'

    const sortChange = column.sortable ? () => onSortChange(column.name) : () => {}

    return <div className={`glyphicon ${arrowClass}`} onClick={sortChange} />

  }
}
