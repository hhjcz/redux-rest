/** Created by hhj on 12/18/15. */
import { Record } from 'immutable'

const Pagination = Record({
  page: 1,
  cursorAt: 1,
  perPage: 10,
  total: 0,
  totalPages: 3,
})

export const setPage = (pagination, page) => new Pagination({
  ...pagination.toObject(), page
})

export const setPageSize = (pagination, perPage) => new Pagination({
  ...pagination.toObject(), perPage
})

export default Pagination
