/** Created by hhj on 3/3/16. */
import { expect } from 'chai'
import { Map } from 'immutable'
import qs from 'query-string'
import queryGenerators from '../queryGenerators'
import Filter from '../models/Filter'
import Sort from '../models/Sort'
import Pagination from '../models/Pagination'

describe('rest library queryGenerators', () => {
  const { fetchCollection: collectionGenerator, fetchOne: itemGenerator } = queryGenerators

  it('should generate query params', () => {
    const someFilter1 = new Filter({ name: 'nejakyFilter1', value: 'hodnotaFiltru1' })
    const someFilter2 = new Filter({
      name: 'nejakyFilter2',
      value: 'hodnotaFiltru2',
      comparator: 'equal'
    })
    const someFilter3 = new Filter({ name: 'nejakyFilter3', value: false, comparator: 'empty' })
    const someFilter4 = new Filter({ name: 'nejakyFilter4', value: true, comparator: 'empty' })
    const filters = Map([
      [someFilter1.name, someFilter1],
      [someFilter2.name, someFilter2],
      [someFilter3.name, someFilter3],
      [someFilter4.name, someFilter4]
    ])
    const sort = new Sort({ dir: true, by: 'nejakySort' })
    const pagination = new Pagination({ page: 66, perPage: 6 })

    const query = collectionGenerator({ filters, sort, pagination })
    expect(query['nejaky_filter_1-lk']).to.equal('%hodnotaFiltru1%')
    expect(query.nejaky_filter_2).to.equal('hodnotaFiltru2')
    // expect(query.nejaky_filter_3).to.equal('')
    expect(query.sort).to.equal('-nejaky_sort')
    expect(query.page).to.equal(66)
    expect(query.per_page).to.equal(6)

    expect(qs.stringify(query)).to.equal('nejaky_filter_1-lk=%25hodnotaFiltru1%25&nejaky_filter_2=hodnotaFiltru2&nejaky_filter_3-not=&nejaky_filter_4-null&page=66&per_page=6&sort=-nejaky_sort')  // eslint-disable-line max-len
  })

  it('should generate from empty object', () => {
    const query = collectionGenerator({})
    expect(query).to.deep.equal({})
  })

  it('should generate single item query params', () => {
    const query = itemGenerator(null, { someParam: 'someValue' })
    expect(query.someParam).to.equal('someValue')
  })

})
