/** Created by hhj on 2/3/16. */

const isValidActionCreator = key => key.indexOf('@') <= -1 && key.indexOf('_') <= -1

export function actionCreatorsFor(actionTypes) {
  return Object.keys(actionTypes).filter(isValidActionCreator).reduce((result, key) => {
    result[key] = args => ({ type: actionTypes[key], ...args })
    return result
  }, {})
}

export default actionCreatorsFor
