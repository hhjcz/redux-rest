/** Created by hhj on 1/29/16. */
import createRest from './createRest'

export { getSubState, getItems, getItem, getIdAtCursor } from './utils'
export createFetch from './fetch/createFetch'
export const collectionTypes = { static: 'static', dynamic: 'dynamic' }

export Pagination from './models/Pagination'
export Sort from './models/Sort'
export Filter from './models/Filter'
export createFetch from './fetch/createFetch'

export default createRest

