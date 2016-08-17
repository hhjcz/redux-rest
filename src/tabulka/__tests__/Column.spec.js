/** Created by hhj on 1/11/16. */
import { expect } from 'chai'
import { Record } from 'immutable'
import { Column, columntValueTypes } from '../Column'

describe('lib tabulka Column', () => {

  it('should instantiate with default values', () => {
    const column = new Column()
    expect(column instanceof Record).to.equal(true)
    expect(column.name).to.equal('columnName')
    expect(column.valueType).to.equal(columntValueTypes.number)
  })

  it('should set default render function', () => {
    const column = new Column({ name: 'someField' })
    const model = { someField: 'someValue' }
    expect(typeof column.render).to.equal('function')
    expect(column.render(model)).to.equal('someValue')
  })

  it('should accept custom render function', () => {
    const column = new Column({
      name: 'someField',
      render: (model, pozice) => `rendered ${model.someField} at ${pozice}`
    })
    const model = { someField: 'someValue' }
    expect(typeof column.render).to.equal('function')
    expect(column.render(model, 5)).to.equal('rendered someValue at 5')
  })

})
