/** Created by hhj on 8/29/16. */
import Pagination, { setPage, setPageSize } from '../models/Pagination'

function setPagination(currentPagination, nextPagination) {
  return !nextPagination ? (
    currentPagination
  ) : (
    new Pagination({
      ...currentPagination.toObject(),
      total: nextPagination.total,
      totalPages: nextPagination.totalPages
    })
  )
}

function setPaginationForIds(currentPagination, nextPagination) {
  return setPagination(
    currentPagination,
    {
      ...nextPagination,
      totalPages: Math.ceil(nextPagination.total / currentPagination.toObject().perPage)
    })
}

/**
 * @param {Object} actionTypes
 * @returns {paginationReducer}
 */
export default function createReducer(actionTypes) {

  return function paginationReducer(state = {}, action) {

    const nextPagination = action.meta ? action.meta.pagination : null

    switch (action.type) {
      case actionTypes.fetchCollectionSuccess:
        return setPagination(state, nextPagination)

      case actionTypes.fetchIdsSuccess:
        return setPaginationForIds(state, nextPagination)

      case actionTypes.gotoPage:
        return setPage(state, action.page)

      case actionTypes.setPagination:
        return new Pagination(action.pagination)

      case actionTypes.pointCursorTo:
        const page = Math.ceil(action.cursorAt / state.perPage)
        return new Pagination({
          ...state.toObject(),
          cursorAt: action.cursorAt,
          page,
        })

      case actionTypes.setPageSize:
        return setPageSize(state, action.perPage)

      default:
        return state
    }
  }
}
