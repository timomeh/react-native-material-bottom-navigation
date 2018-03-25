import React from 'react'
import { View } from 'react-native'
import { shallow } from 'enzyme'

import BackgroundDecorator from '../lib/BackgroundDecorator'
import BackgroundRippleAnimation from '../lib/BackgroundRippleAnimation'

describe('BackgroundDecorator', () => {
  const consoleError = console.error
  let mountedDecorator
  let props
  const bgDecorator = () => {
    if (!mountedDecorator) {
      mountedDecorator = shallow(<BackgroundDecorator {...props} />)
    }
    return mountedDecorator
  }

  beforeEach(() => {
    mountedDecorator = null
    props = {
      children: jest.fn()
    }

    // prevent output of warnings because of native RN Components
    console.error = () => {}
  })

  afterEach(() => {
    console.error = consoleError
  })

  it('initially has no decorators', () => {
    expect(bgDecorator().state().decorators).toEqual([])
  })

  it('handles new decorator', () => {
    const decoratorData = { x: 0, y: 0, color: 'red' }
    bgDecorator()
      .instance()
      .addDecorator(decoratorData)

    expect(bgDecorator().state().decorators[0]).toHaveProperty('x', 0)
    expect(bgDecorator().state().decorators[0]).toHaveProperty('y', 0)
    expect(bgDecorator().state().decorators[0]).toHaveProperty('color', 'red')
    expect(bgDecorator().state().decorators[0]).toHaveProperty('key')
  })

  it('renders all current decorators', () => {
    const decoratorData = { x: 0, y: 0, color: 'red' }
    bgDecorator()
      .instance()
      .addDecorator(decoratorData)
    bgDecorator()
      .instance()
      .addDecorator(decoratorData)
    bgDecorator()
      .instance()
      .addDecorator(decoratorData)

    bgDecorator().update()

    expect(bgDecorator().find(BackgroundRippleAnimation)).toHaveLength(3)
  })

  it('handles background color change', () => {
    bgDecorator()
      .instance()
      .setBackgroundColor('red')

    bgDecorator().update()

    expect(
      bgDecorator()
        .find(View)
        .first()
        .props().style
    ).toContainEqual({ backgroundColor: 'red' })
  })
})
