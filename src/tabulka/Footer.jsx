/** Created by hhj on 12/29/15. */
import React, { PropTypes } from 'react'
import { FormGroup, FormControl, InputGroup } from 'react-bootstrap'
import debounce from '../debounce'
import ColumnsControl from './ColumnsControl'

export default class Footer extends React.Component {
  static propTypes = {
    rowCount: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    onRowCountChange: PropTypes.func.isRequired,
    columns: PropTypes.object.isRequired,
    setColumnVisibility: PropTypes.func.isRequired,
    bsSize: PropTypes.string,
    debounce: PropTypes.number
  };

  static defaultProps = {
    debounce: 500,
    bsSize: 'small',
    maxButtons: 9,
  };

  static validatePageSize(rowCount) {
    return Footer.parsePageSize(rowCount) > 0
  }

  static parsePageSize(rowCount) {
    return parseInt(rowCount, 10)
  }

  constructor(props) {
    super(props);
    this.state = {
      rowCount: this.props.rowCount
    }
    this.onRowCountChange = this.onRowCountChange.bind(this)
    this.debouncedRowCountChange = debounce(this.debouncedRowCountChange, this.props.debounce, this)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.rowCount !== nextProps.rowCount) {
      this.setState({ rowCount: nextProps.rowCount })
    }
  }

  onRowCountChange(event) {
    const rowCount = event.target.value
    this.setState({ rowCount })
    return this.debouncedRowCountChange(rowCount)
  }

  debouncedRowCountChange(rowCount) {
    if (Footer.validatePageSize(rowCount)) {
      this.props.onRowCountChange(Footer.parsePageSize(rowCount))
    }
  }

  render() {
    const { columns, setColumnVisibility, total, bsSize } = this.props
    return (
      <div className="row" style={{ marginTop: '1em' }}>
        <div className="col col-md-2 ">
          <FormGroup bsSize={bsSize} bsSize={bsSize}>
            <InputGroup>
              <InputGroup.Addon>total</InputGroup.Addon>
              <FormControl type="text" value={total} disabled />
            </InputGroup>
          </FormGroup>
        </div>
        <div className="col col-xs-2">
          <FormGroup
            id="rowCountFG"
            bsSize={bsSize}
            validationState={!Footer.validatePageSize(this.state.rowCount) ? 'error' : ''}
          >
            <InputGroup>
              <InputGroup.Addon>rows</InputGroup.Addon>
              <FormControl
                type="text" id="rowCountInput"
                value={this.state.rowCount}
                onChange={this.onRowCountChange}
              />
            </InputGroup>
          </FormGroup>
        </div>
        <div className="col col-md-6 col-md-offset-1">
          <ColumnsControl columns={columns} setColumnVisibility={setColumnVisibility} />
        </div>
      </div>
    )
  }
}
