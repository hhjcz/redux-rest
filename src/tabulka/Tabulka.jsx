/** Created by hhj on 12/28/15. */
import React, { PropTypes } from 'react'
import { List } from 'immutable'
import '../../assets/Tabulka.styl'
import HeaderCell from './HeaderCell'
import Radka from './Radka'
import Footer from './Footer'

export default class Tabulka extends React.Component {

  static propTypes = {
    columns: PropTypes.object.isRequired,
    items: PropTypes.object,
    uniqueField: PropTypes.string,
    pagination: PropTypes.object,
    sort: PropTypes.object,
    filters: PropTypes.object,
    fetching: PropTypes.bool,
    onRowCountChange: PropTypes.func.isRequired,
    onSortChange: PropTypes.func.isRequired,
    onFilterChange: PropTypes.func.isRequired,
    setColumnVisibility: PropTypes.func.isRequired,
  };

  static defaultProps = {
    columns: List(),
    pagination: {},
    uniqueField: 'id',
  };

  render() {
    const { fetching, items, uniqueField, pagination, sort, filters, onSortChange, onFilterChange, columns, setColumnVisibility, onRowCountChange } = this.props // eslint-disable-line max-len
    let offset = ((pagination.page - 1) * pagination.perPage) + 1

    return (
      <div className={`myTable ${(fetching ? 'fetching' : '')}`}>
        {/* header */}
        <div className="myTableRow">
          {
            columns.filter(col => col.visible).map(col =>
              <HeaderCell
                key={col.name} sort={sort} column={col} filter={filters.get(col.name)}
                onSortChange={onSortChange} onFilterChange={onFilterChange}
              />
            )
          }
        </div>
        {/* rows */}
        {
          items.map(item =>
            <Radka
              key={item[uniqueField]} model={item} columns={columns.toList()}
              pagination={pagination} pozice={offset} highlighted={offset++ === pagination.cursorAt}
            />
          )
        }
        {fetching ? <div className="fetchIndicator glyphicon visible" /> : ''}
        <Footer columns={columns} setColumnVisibility={setColumnVisibility} rowCount={pagination.perPage} total={pagination.total} onRowCountChange={onRowCountChange} />
      </div>
    )
  }
}
