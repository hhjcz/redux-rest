/** Created by hhj on 3/16/16. */
import React, { PropTypes } from 'react'
import FontIcon from 'material-ui/FontIcon'
import '../icons.css'

export default class MyIcon extends React.Component {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    style: PropTypes.object,
    forcedStyle: PropTypes.object,
    color: PropTypes.string,
  };

  static defaultProps = {
    color: 'white',
  };

  static defaultStyle = {
    verticalAlign: 'middle',
    fontSize: '20px'
  };

  render() {
    const style = { ...MyIcon.defaultStyle, ...this.props.style, ...this.props.forcedStyle }

    return (
      <FontIcon className="material-icons" {...this.props} style={style}>
        {this.props.children}
      </FontIcon>
    )
  }
}
