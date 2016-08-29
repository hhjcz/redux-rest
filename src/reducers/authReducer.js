/** Created by hhj on 7/13/16. */
import { Record } from 'immutable'
import * as actions from '../actions/authActions'

const InitialState = Record({
  isAuthenticationRequired: false,
  token: null,
})

const reducer = (state = {}, action) => {
  if (!(state instanceof InitialState)) return new InitialState(state)

  switch (action.type) {
    case actions.AUTHENTICATION_REQUIRED:
      return state.set('isAuthenticationRequired', true)

    case actions.LOGIN_SUCCESS:
      return state.set('token', action.response.token)
        .set('isAuthenticationRequired', false)

    case actions.LOGOUT_SUCCESS:
      return state.set('token', '')

    default:
      return state
  }
}

export default reducer
