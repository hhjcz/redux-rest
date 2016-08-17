/** Created by hhj on 5/13/16. */
import React, { PropTypes } from 'react'
import { Map } from 'immutable'
import Button from 'react-bootstrap/lib/Button'
import Label from 'react-bootstrap/lib/Label'

export default class ColumnsControl extends React.Component {
  static propTypes = {
    columns: PropTypes.object.isRequired,
    setColumnVisibility: PropTypes.func.isRequired,
  };

  static defaultProps = {
    columns: Map()
  };

  constructor(props) {
    super(props)
    this.toggleVisibility = this.toggleVisibility.bind(this)
    this.state = {
      open: false
    }
  }

  toggleVisibility(column) {
    this.props.setColumnVisibility(column.name, !column.visible)
  }

  render() {
    const self = this
    const { columns } = this.props

    return (
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        <span className="text-info">Columns:</span>
        {
          columns.map(column =>
            <Button className="btn-default btn-sm" onClick={() => self.toggleVisibility(column)} active={column.visible} key={column.name}>
              {column.caption || column.name}
            </Button>
          )
        }
      </div>
    )
  }
}
