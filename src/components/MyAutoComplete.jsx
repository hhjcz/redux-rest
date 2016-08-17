/** Created by hhj on 4/1/16. */
/* eslint-disable no-nested-ternary */
import React, { PropTypes } from 'react'
import AutoComplete from 'react-autocomplete'
import { Glyphicon } from 'react-bootstrap'

const styles = {
  item: {
    padding: '0.1em 0.8em',
    cursor: 'default'
  },

  highlightedItem: {
    padding: '0.1em 0.8em',
    color: 'white',
    background: 'hsl(200, 50%, 50%)',
    cursor: 'default'
  },

  menu: {
    position: 'fixed',
    zIndex: 500,
    background: 'white',
    padding: '0 0',
    border: 'solid 1px #ccc',
    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
    maxHeight: '20em',
    overflow: 'auto',
  }
}

// collection of items as returned by renderItem()
let previousItemHolder
const renderItems = items => items.map((item, index) => {
  const group = item.props.group
  // const text = item.props.children
  if (index === 0 || previousItemHolder.props.group !== group) {
    const style = {
      background: '#eee',
      color: '#454545',
      padding: '2px 0.4em',
      fontWeight: 'bold'
    }
    previousItemHolder = item
    return [<div style={style}>{group.toUpperCase()}</div>, item]
  }

  previousItemHolder = item
  return item
})

const renderItem = (item, isHighlighted) =>
  <div style={isHighlighted ? styles.highlightedItem : styles.item} key={item.value} group={item.group}>
    {item.value}
  </div>


export default class MyAutoComplete extends React.Component {

  static propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired,
    getAutoCompleteValues: PropTypes.func,
    draggable: PropTypes.bool,
    bsStyle: PropTypes.string,
  };

  static defaultProps = {
    getAutoCompleteValues: null,
    draggable: true,
  };

  constructor(props) {
    super(props)
    this.renderMenu = this.renderMenu.bind(this)
    // this.getAutoCompleteValues = debounce(this.getAutoCompleteValues, 500, this)
    this.getAutoCompleteValues = this.getAutoCompleteValues.bind(this)
    this.state = { value: props.value, autoCompleteValues: [], message: '' }
  }

  // TODO - clear autoCompleteValues when value is updated from 'outside'
  //      - did not work for me now, as nexProps.value was always different from this.state.value, so onChange was not working...
  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.value) {
      // this.getAutoCompleteValues(nextProps)
    }
  }

  async getAutoCompleteValues(value) {
    if (typeof this.props.getAutoCompleteValues !== 'function') return

    let values = this.props.getAutoCompleteValues(value)
    if (values instanceof Promise) {
      this.setState({ message: '...hledám...' })
      values = await values
    }

    if (typeof values === 'string') {
      this.setState({
        autoCompleteValues: [],
        message: values
      })
    } else {
      this.setState({
        autoCompleteValues: values,
        message: values.length === 0 ? '...žádná shoda' : ''
      })
    }
  }

  renderMenu(items, value, style) {
    return (
      <div style={{ ...styles.menu, ...style }}>
        {value === '' ? (
          null
        ) : this.state && this.state.message ? (
          <div style={{ padding: '0.8em' }}>{this.state.message}</div>
        ) : items.length === 0 ? (
          null
          /* <div style={{ padding: '0.8em' }}>...žádná shoda...</div> */
        ) : renderItems(items)}
      </div>
    )
  }

  render() {
    const self = this
    const { label, value, onChange, draggable, bsStyle } = this.props

    const autoCompleteValues =
      !this.state.message && this.state.autoCompleteValues && this.state.autoCompleteValues.filter ? (
        this.state.autoCompleteValues
      ) : []

    return (
      <div className={`input-group input-group-sm has-${bsStyle}`}>
        <span className="input-group-addon">{label}</span>
        <AutoComplete
          ref="autocomplete"
          value={value}
          inputProps={{ className: 'form-control', draggable }}
          wrapperStyle={{}}
          items={autoCompleteValues}
          getItemValue={item => item.value}
          renderItem={renderItem}
          renderMenu={self.renderMenu}
          onChange={function(e, value) { self.getAutoCompleteValues(value); onChange(value) }}
          onSelect={function(value) { onChange(value) }}
        />
        <span className="input-group-addon" style={{ cursor: 'pointer' }} onClick={function() { onChange('') }}>
          <Glyphicon glyph="erase" />
        </span>
      </div>
    )
  }
}
