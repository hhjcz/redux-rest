/** Created by hhj on 1/26/16. */
import fetch from 'isomorphic-fetch'

export default function createFetch(serverBaseUrl) {
  console.log('Creating resource for server base URL: ', serverBaseUrl)

  /** @return {Promise} */
  return (url, options = {}) => fetch(serverBaseUrl + url, options)
    .then(
      response => {
        if (response.status === 204 || response.status === 401 || response.status === 403) return response

        if (!response.ok) {
          try {
            return response.json().then(body => {
              throw new Error(`${body.message} (status ${response.status})`)
            })
          } catch (error) {
            throw new Error(`${response.status} ${response.statusText}`)
          }
        }
        // if (response.status === 204) return response
        return response.json()  // parse json to object
      })
}
