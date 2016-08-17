/** Created by hhj on 12/29/15. */
import React, { PropTypes } from 'react'
import { Pagination, FormGroup, FormControl, InputGroup } from 'react-bootstrap'

export default class Paginator extends React.Component {
  static propTypes = {
    pagination: PropTypes.object.isRequired,
    onPageChange: PropTypes.func.isRequired,
    bsSize: PropTypes.string,
    maxButtons: PropTypes.number,
    debounce: PropTypes.number
  };

  static defaultProps = {
    debounce: 500,
    bsSize: 'small',
    maxButtons: 9,
  };

  render() {
    const { pagination, onPageChange, bsSize, maxButtons } = this.props
    return (
      <div>
        <Pagination
          items={pagination.totalPages}
          activePage={pagination.page}
          prev next first last ellipsis
          bsSize={bsSize} maxButtons={maxButtons}
          onSelect={function(eventKey) {
            if (pagination.page !== eventKey) onPageChange(eventKey)
          }}
        />
      </div>
    )
  }
}
