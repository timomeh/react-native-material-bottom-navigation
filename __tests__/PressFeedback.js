import React from 'react'
import { View } from 'react-native'
import { shallow } from 'enzyme'

import PressFeedback from '../lib/PressFeedback'
import PressRippleAnimation from '../lib/PressRippleAnimation'

describe('PressFeedback', () => {
  const consoleError = console.error
  let mountedFeedback
  let props
  const pressFeedback = () => {
    if (!mountedFeedback) {
      mountedFeedback = shallow(<PressFeedback {...props} />)
    }
    return mountedFeedback
  }

  beforeEach(() => {
    mountedFeedback = null
    props = {
      children: jest.fn()
    }

    // prevent output of warnings because of native RN Components
    console.error = () => {}
  })

  afterEach(() => {
    console.error = consoleError
  })

  it('initially has no presses', () => {
    expect(pressFeedback().state().presses).toEqual([])
  })

  it('handles new presses', () => {
    const pressData = { key: 13, x: 3, y: 7, color: 'red' }
    pressFeedback()
      .instance()
      .addFeedbackIn(pressData)

    expect(pressFeedback().state().presses[0]).toHaveProperty('key', 13)
    expect(pressFeedback().state().presses[0]).toHaveProperty('x', 3)
    expect(pressFeedback().state().presses[0]).toHaveProperty('y', 7)
    expect(pressFeedback().state().presses[0]).toHaveProperty('color', 'red')
  })

  it('renders all current presses', () => {
    // Add some presses
    const pressData = { key: 13, x: 3, y: 7, color: 'red' }
    pressFeedback()
      .instance()
      .addFeedbackIn(pressData)
    pressFeedback()
      .instance()
      .addFeedbackIn(pressData)
    pressFeedback()
      .instance()
      .addFeedbackIn(pressData)

    pressFeedback().update()

    expect(pressFeedback().find(PressRippleAnimation)).toHaveLength(3)
  })

  it('enqueues the removal of a press', () => {
    // Add some presses...
    pressFeedback()
      .instance()
      .addFeedbackIn({ key: 'meh', x: 1, y: 2, color: 'white' })
    pressFeedback()
      .instance()
      .addFeedbackIn({ key: 'this-out', x: 3, y: 4, color: 'green' })
    pressFeedback()
      .instance()
      .addFeedbackIn({ key: 'huh', x: 5, y: 6, color: 'black' })

    // ...and enqueue a removal.
    pressFeedback()
      .instance()
      .enqueueFeedbackOut('this-out')

    expect(pressFeedback().state().presses).toContainEqual({
      key: 'this-out',
      x: 3,
      y: 4,
      color: 'green',
      animateOut: true
    })
  })

  it('removes a press when finished', () => {
    // Add some presses...
    pressFeedback()
      .instance()
      .addFeedbackIn({ key: 'meh', x: 1, y: 2, color: 'white' })
    pressFeedback()
      .instance()
      .addFeedbackIn({ key: 'this-out', x: 3, y: 4, color: 'green' })

    pressFeedback().update()

    pressFeedback()
      .find(PressRippleAnimation)
      .last()
      .props()
      .onOutEnd()

    expect(pressFeedback().state().presses).toHaveLength(1)
    expect(pressFeedback().state().presses).not.toContainEqual({
      key: 'this-out',
      x: 3,
      y: 4,
      color: 'green'
    })
  })
})
