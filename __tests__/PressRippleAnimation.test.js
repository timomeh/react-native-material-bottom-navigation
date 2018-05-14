import React from 'react'
import { Animated } from 'react-native'
import { shallow } from 'enzyme'

import PressRippleAnimation from '../lib/PressRippleAnimation'

jest.useFakeTimers()
jest.mock('Animated', () => {
  return {
    View: () => <div />,
    Value: jest.fn(num => ({
      interpolate: jest.fn(() => num)
    })),
    timing: jest.fn((value, options) => {
      return {
        start(cb) {
          setTimeout(cb, options.duration)
        }
      }
    })
  }
})

describe('PressRippleAnimation', () => {
  const consoleError = console.error
  let mountedRipple
  let props
  const animationFn = jest.spyOn(Animated, 'timing')
  const ripple = () => {
    if (!mountedRipple) {
      mountedRipple = shallow(<PressRippleAnimation {...props} />)
    }
    return mountedRipple
  }

  beforeEach(() => {
    animationFn.mockClear()
    mountedRipple = null
    props = {
      x: 10,
      y: 10,
      onInEnd: jest.fn(),
      onOutEnd: jest.fn(),
      color: 'purple',
      size: 100
    }

    // prevent output of warnings because of native RN Components
    console.error = () => {}
  })

  afterEach(() => {
    console.error = consoleError
    jest.clearAllTimers()
  })

  it('initially runs through long press animation', () => {
    ripple()
    expect(animationFn).toHaveBeenCalledTimes(1)
    expect(props.onInEnd).not.toHaveBeenCalled()

    jest.advanceTimersByTime(400)

    expect(props.onInEnd).toHaveBeenCalled()

    ripple().setProps({ animateOut: true })
    expect(animationFn).toHaveBeenCalledTimes(2)

    jest.advanceTimersByTime(300)
    expect(props.onOutEnd).toHaveBeenCalled()
  })

  it('initially runs through short press animation', () => {
    ripple()
    expect(animationFn).toHaveBeenCalledTimes(1)
    expect(props.onInEnd).not.toHaveBeenCalled()

    ripple().setProps({ animateOut: true })

    jest.advanceTimersByTime(400)

    expect(props.onInEnd).toHaveBeenCalled()
    expect(animationFn).toHaveBeenCalledTimes(2)

    jest.advanceTimersByTime(400)
    expect(props.onOutEnd).toHaveBeenCalled()
  })

  it('renders an animated view', () => {
    expect(ripple().find(Animated.View)).toHaveLength(1)
    const { style } = ripple()
      .find(Animated.View)
      .props()
    expect(style).toHaveProperty('backgroundColor', 'purple')
    expect(style).toHaveProperty('width', 100)
    expect(style).toHaveProperty('height', 100)
  })
})
