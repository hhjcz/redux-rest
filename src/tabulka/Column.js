/** Created by hhj on 1/11/16. */
import { Record } from 'immutable'

export const columntValueTypes = {
  number: 'number',
  string: 'string',
  boolean: 'boolean',
  date: 'date',
  ipAddress: 'ipAddress',
}

export class Column extends Record({
  name: 'columnName',
  caption: 'Column Name',
  valueType: columntValueTypes.number,
  defaultValue: null,
  disabled: false,
  visible: true,
  sortable: true,
  position: 1,
  width: 2,
  render: null
}) {
  constructor(args = {}) {
    args.render = args.render || ((model, pozice) => model[this.name])  // eslint-disable-line no-unused-vars
    args.caption = args.caption || args.name
    super(args)
  }
}

export default Column
