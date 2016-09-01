/** Created by hhj on 1/29/16. */
import createRest from './createRest'
import * as selectors from './selectors'
import createFetch from './resource/createFetch'
import Pagination from './models/Pagination'
import Sort from './models/Sort'
import Filter from './models/Filter'

export default createRest
const collectionTypes = { static: 'static', dynamic: 'dynamic' }

export {
  createRest,
  selectors,
  collectionTypes,
  Pagination,
  Sort,
  Filter,
  createFetch,
}

