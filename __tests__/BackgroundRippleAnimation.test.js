import React from 'react'
import { Animated } from 'react-native'
import { shallow } from 'enzyme'

import BackgroundRippleAnimation from '../lib/BackgroundRippleAnimation'

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

describe('BackgroundRippleAnimation', () => {
  const consoleError = console.error
  let mountedRipple
  let props
  const animationFn = jest.spyOn(Animated, 'timing')
  const ripple = () => {
    if (!mountedRipple) {
      mountedRipple = shallow(<BackgroundRippleAnimation {...props} />)
    }
    return mountedRipple
  }

  beforeEach(() => {
    animationFn.mockClear()
    mountedRipple = null
    props = {
      containerWidth: 200,
      containerHeight: 50,
      x: 10,
      y: 10,
      onAnimationEnd: jest.fn(),
      color: 'purple'
    }

    // prevent output of warnings because of native RN Components
    console.error = () => {}
  })

  afterEach(() => {
    console.error = consoleError
    jest.clearAllTimers()
  })

  it('initially calculates radius', () => {
    expect(ripple().instance().radius).toBeCloseTo(194, 0)
  })

  it('initially runs through animation', () => {
    ripple()
    expect(animationFn).toHaveBeenCalled()
    expect(props.onAnimationEnd).not.toHaveBeenCalled()

    jest.advanceTimersByTime(400)

    expect(props.onAnimationEnd).toHaveBeenCalled()
  })

  it('renders an animated view', () => {
    expect(ripple().find(Animated.View)).toHaveLength(1)
    expect(
      ripple()
        .find(Animated.View)
        .props().style
    ).toHaveProperty('backgroundColor', 'purple')
  })
})
