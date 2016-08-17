/** Created by hhj on 1/6/16. */
import { expect } from 'chai'
import createMapDispatchToProps from '../createMapDispatchToProps'

describe('createMapDispatchToProps', () => {

  const firstAction = x => x
  const secondAction = y => y
  const thirdAction = z => z
  const dispatch = z => `dispatched ${z}`

  it('should map dispatch function to props', () => {
    const props = createMapDispatchToProps({ firstAction, secondAction })(dispatch)

    expect(props.dispatch).to.equal(dispatch)
  })

  it('should bind actions to dispatch function', () => {
    const props = createMapDispatchToProps({ firstAction, secondAction })(dispatch)

    expect(typeof props.actions.firstAction).to.equal('function')
    expect(props.actions.firstAction('something')).to.equal('dispatched something')
  })

  it('should bind actions passed as array', () => {
    const actions = [{ firstAction, secondAction }, { thirdAction, firstAction }]
    const props = createMapDispatchToProps(actions)(dispatch)

    expect(typeof props.actions.firstAction).to.equal('function')
    expect(props.actions.thirdAction('something')).to.equal('dispatched something')
  })

  it('should bind nested actions passed as deep object', () => {
    const actions = {
      firstGroup: { firstAction, secondAction },
      secondGroup: { secondAction, firstAction }
    }
    const props = createMapDispatchToProps(actions)(dispatch)

    expect(typeof props.actions.firstGroup.firstAction).to.equal('function')
    expect(props.actions.firstGroup.secondAction('something')).to.equal('dispatched something')
  })

  it('should not duplicate actions (should merge)', () => {
    const actions = [
      { firstAction, secondAction },
      { secondAction, firstAction },
      { secondAction, firstAction }
    ]
    const props = createMapDispatchToProps(actions)(dispatch)

    expect(Object.keys(props.actions).length).to.equal(2)
  })

  it('should filter out strings', () => {
    const actions = { firstAction, secondAction, firstString: 'FIRST-STRING' }
    const props = createMapDispatchToProps(actions)(dispatch)

    expect(Object.keys(props.actions).length).to.equal(2)
  })

  it('should filter out nested strings', () => {
    const actions = {
      firstGroup: { firstAction, secondAction },
      secondGroup: { secondAction, firstAction },
      thirdGroup: { firstString: 'FIRST-STRING' }
    }
    const props = createMapDispatchToProps(actions)(dispatch)

    expect(Object.keys(props.actions).length).to.equal(3)
  })

})
