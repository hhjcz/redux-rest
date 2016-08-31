/** Created by hhj on 1/29/16. */
import createRest from './createRest'

export { getResourceWithItems, getItems, getItem, getIdAtCursor } from './selectors'
export createFetch from './resource/createFetch'
export const collectionTypes = { static: 'static', dynamic: 'dynamic' }

export Pagination from './models/Pagination'
export Sort from './models/Sort'
export Filter from './models/Filter'
export createFetch from './resource/createFetch'

export default createRest
