/** Created by hhj on 1/14/16. */
import { expect } from 'chai'

import debounce from '../debounce'

describe('debounce', () => {

  let context
  const fn = function fn(args) {
    this.alteredValue = this.value + args
    return this.alteredValue
  }

  beforeEach(() => {
    context = { value: 'value' }
  })

  it('should bind context using call', () => {
    const debouncedFn = debounce.call(context, fn, 1)

    return debouncedFn('Altered1').then(() => {
      expect(context.alteredValue).to.equal('valueAltered1')
    })
  })

  it('should bind context passed as a parameter', () => {
    const debouncedFn = debounce(fn, 1, context)

    return debouncedFn('Altered2').then(() => {
      expect(context.alteredValue).to.equal('valueAltered2')
    })
  })

  it('should be explicitly bindable', () => {
    const debouncedFn = debounce(fn, 1).bind(context)

    return debouncedFn('Altered3').then(() => {
      expect(context.alteredValue).to.equal('valueAltered3')
    })
  })

  it('should return value as promised', () => {
    const debouncedFn = debounce(fn, 1, context)

    return debouncedFn('Altered4').then(returnValue => {
      expect(returnValue).to.equal('valueAltered4')
    })
  })

  it('should return value as promised using explicit bind', () => {
    const debouncedFn = debounce(fn, 1).bind(context)

    return debouncedFn('Altered5').then(returnValue => {
      expect(returnValue).to.equal('valueAltered5')
    })

  })

})
