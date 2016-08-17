/** Created by hhj on 3/2/16. */
import React, { PropTypes } from 'react'

export default class MyDraggable extends React.Component {
  static propTypes = {
    value: PropTypes.any.isRequired,
    children: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
    style: PropTypes.object,
  };

  static defaultProps = {
    onChange() {},
    style: {},
  };

  static validate(value) {
    return value && value.length >= 0
  }

  static droppedTo = null;

  constructor(props) {
    super(props)
    this.onDragStart = this.onDragStart.bind(this)
    this.onDragEnd = this.onDragEnd.bind(this)
    this.onDragOver = this.onDragOver.bind(this)
    this.onDragLeave = this.onDragLeave.bind(this)
    this.onDrop = this.onDrop.bind(this)
    this.bsStyle = this.bsStyle.bind(this)

    this.state = { draggedOver: false }
  }

  onDragStart(e, value) {
    MyDraggable.droppedTo = null
    // value will be retrieved in onDrop event, see below
    e.dataTransfer.setData('value', value)
  }

  onDragEnd() {
    // clear value when successfully dropped to other draggable instance
    if (MyDraggable.droppedTo && MyDraggable.droppedTo !== this) {
      this.props.onChange('')
    }
    MyDraggable.droppedTo = null
    this.setState({ draggedOver: false })
  }

  onDragOver(e) {
    e.preventDefault()
    this.setState({ draggedOver: true })
  }

  onDragLeave() {
    this.setState({ draggedOver: false })
  }

  onDrop(e) {
    // indicate that it was dropped here
    MyDraggable.droppedTo = this
    this.setState({ draggedOver: false })
    this.props.onChange(e.dataTransfer.getData('value'))
  }

  bsStyle(value) {
    const bsStyle = {}
    if (this.state.draggedOver) bsStyle.bsStyle = 'warning'
    else if (value && value.length > 0) {
      bsStyle.bsStyle = MyDraggable.validate(value) ? 'success' : 'error'
    }

    return bsStyle
  }

  render() {
    const { value, children, onChange, style, ...propsToPassDown } = this.props  // eslint-disable-line no-unused-vars
    const childrenWithProps = React.Children.map(children, child => (
      child.type !== undefined ? (
        React.cloneElement(child, {
          draggable: true, bsStyle: this.bsStyle(value).bsStyle
        })
      ) : child))

    return (
      <span
        draggable onDragStart={e => this.onDragStart(e, value)} onDragEnd={this.onDragEnd}
        onDragOver={this.onDragOver} onDragLeave={this.onDragLeave} onDrop={this.onDrop}
        {...propsToPassDown}
        style={{ cursor: 'move', ...style }}
      >
        {childrenWithProps}
      </span>
    )
  }
}
