/** Created by hhj on 1/21/16. */
import React, { PropTypes } from 'react'
import { FormGroup, FormControl } from 'react-bootstrap'
import { Filter } from '../../app/models/Filter'
import debounce from '../debounce'

export default class HeaderFilter extends React.Component {
  static propTypes = {
    column: PropTypes.object.isRequired,
    filter: PropTypes.object,
    onFilterChange: PropTypes.func.isRequired,
    debounce: PropTypes.number,
  };

  static defaultProps = {
    debounce: 500,
  };

  static filterFromProps(props) {
    return props.filter ? props.filter.value : ''
  }

  constructor(props) {
    super(props)
    this.state = {
      filterValue: HeaderFilter.filterFromProps(props),
      filterVisible: false
    }
    if (this.props.debounce > 0) {
      this.onFilterChange = debounce(this.onFilterChange, this.props.debounce, this)
    }
    this.toggleFilter = this.toggleFilter.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      filterValue: HeaderFilter.filterFromProps(nextProps)
    })
  }

  onFilterChange(filterValue) {
    this.props.onFilterChange(new Filter({ name: this.props.column.name, value: filterValue }))
  }

  toggleFilter() {
    this.setState({ filterVisible: !this.state.filterVisible })
  }

  render() {
    const self = this
    const active = this.state.filterValue ? 'active' : ''
    const visible = this.state.filterVisible ? 'visible' : ''

    return (
      <div>
        <div className={`glyphicon filterIcon ${active}`} onClick={this.toggleFilter} />

        <div className={`columnFilter vcenter ${visible}`}>
          <FormGroup validationState="success">
            <FormControl
              id="filterInput"
              type="text" value={this.state.filterValue}
              onChange={function(event) {
                const filterValue = event.target.value
                self.setState({ filterValue })
                self.onFilterChange(filterValue)
              }}
            />
          </FormGroup>
        </div>
      </div>
    )
  }
}
