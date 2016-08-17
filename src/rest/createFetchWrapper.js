/** Created by hhj on 12/29/15. */
import React from 'react'

export default function createFetchWrapper(...actions) {

  // FIXME - does not work this way - the static properties can't be seen in server.js
  return Wrapped => class FetchWrapper extends React.Component {

    static propTypes = {
      dispatch: React.PropTypes.func.isRequired
    };

    // server side fetching (see server.js):
    static fetchActions = actions;

    // browser fetching:
    componentDidMount() {
      actions.forEach((action) => this.props.dispatch(action()))
    }

    render() {
      return (
        <Wrapped {...this.props} />
      )
    }
  }
}
