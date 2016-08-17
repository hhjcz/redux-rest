/** Created by hhj on 3/22/16. */
import { toastr } from 'react-redux-toastr'
import 'react-redux-toastr/src/less/index.less'

export default function myErrorHandler(error) {
  if (!error) return
  const message = error.message || error
  console.error(message)
  toastr.error(message)

  return
}
