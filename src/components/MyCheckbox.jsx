/** Created by hhj on 8/12/16. */
import React, { PropTypes } from 'react'
import Checkbox from 'react-bootstrap/lib/Checkbox'

export default class MyCheckbox extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string,
    checked: PropTypes.bool,
  };

  static defaultProps = {
    checked: false,
    label: '',
  };

  render() {
    const { label, onChange, checked } = this.props;
    return (
      <div className="checkbox">
        <Checkbox checked={checked}>{label}</Checkbox>
      </div>
    )
  }
}
