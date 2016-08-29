/** Created by hhj on 7/13/16. */

export const AUTHENTICATION_REQUIRED = 'AUTHENTICATION_REQUIRED'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_ERROR = 'LOGIN_ERROR'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'

export default function createAuthActions(depsContainer) {

  const authenticationRequired = () => ({ type: AUTHENTICATION_REQUIRED })

  const login = (email, password) => ({ dispatch }) => {
    const url = '/auth/login'

    depsContainer.fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ email, password })
    })
      .then(response => {
        dispatch({ type: LOGIN_SUCCESS, response })
        return response
      })
      .catch(error => {
        const message = `Ajejej, auth fetch error: ${error.message}, url: ${url}`
        dispatch({ type: LOGIN_ERROR, error })
        throw new Error(message)
      })
  }

  const logout = () => ({ type: LOGOUT_SUCCESS })

  return {
    authenticationRequired,
    login,
    logout,
  }
}

