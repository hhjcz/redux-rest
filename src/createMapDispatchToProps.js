/** Created by hhj on 12/28/15. */
import { bindActionCreators } from 'redux'
import { reduce, isArray } from 'lodash'

/**
 * @param actions
 */
const createMapDispatchToProps = actions => dispatch => {
  const boundActions = reduce(actions, (result, value, key) => {
    if (typeof value === 'string') return result
    if (isArray(actions)) {
      /* eslint-disable no-param-reassign */
      result = { ...result, ...bindActionCreators(value, dispatch) }   // merge array items
    } else {
      result[key] = bindActionCreators(value, dispatch)   // add nested actions as object
    }

    return result
  }, {})

  return ({
    dispatch,
    actions: boundActions
  })
}

export default createMapDispatchToProps
