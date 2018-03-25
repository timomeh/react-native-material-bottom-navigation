import React from 'react'
import { View } from 'react-native'
import { mount } from 'enzyme'

import BackgroundDecorator from '../lib/BackgroundDecorator'
import PressFeedback from '../lib/PressFeedback'
import BottomNavigation from '../lib/BottomNavigation'

const MockTab = () => <View />

describe('BottomNavigation', () => {
  const consoleError = console.error
  let mountedBN
  let props
  const bottomNavigation = () => {
    if (!mountedBN) {
      mountedBN = mount(<BottomNavigation {...props} />)
    }
    return mountedBN
  }

  beforeEach(() => {
    // prevent output of warnings because of native RN Components
    console.error = () => {}
  })

  afterEach(() => {
    console.error = consoleError
  })

  describe('uncontrolled with three mock tabs', () => {
    beforeEach(() => {
      mountedBN = null
      props = {
        tabs: [
          { key: 1, data: 'up' },
          { key: 2, data: 'town' },
          { key: 3, data: 'funk' }
        ],
        onTabPress: jest.fn(),
        renderTab: jest.fn(() => <MockTab />)
      }
    })

    it('renders BackgroundDecorator', () => {
      expect(bottomNavigation().find(BackgroundDecorator)).toHaveLength(1)
    })

    it('renders PressFeedback', () => {
      expect(bottomNavigation().find(PressFeedback)).toHaveLength(1)
    })

    it('renders all tabs', () => {
      expect(bottomNavigation().find(MockTab)).toHaveLength(3)
    })

    it('passes touchable props to tab component', () => {
      const tabProps = bottomNavigation()
        .find(MockTab)
        .first()
        .props()

      // Just test a few. If they are passed, we can be pretty sure all
      // are passed.
      expect(tabProps).toHaveProperty('onResponderGrant')
      expect(tabProps).toHaveProperty('onResponderMove')
      expect(tabProps).toHaveProperty('onResponderRelease')
    })

    it('calls renderTab with correct amount of times', () => {
      bottomNavigation()
      expect(props.renderTab).toHaveBeenCalledTimes(3)
    })

    it('calls renderTab with correct arguments', () => {
      bottomNavigation()
      expect(props.renderTab.mock.calls).toEqual([
        [{ isActive: true, tab: { key: 1, data: 'up' } }],
        [{ isActive: false, tab: { key: 2, data: 'town' } }],
        [{ isActive: false, tab: { key: 3, data: 'funk' } }]
      ])
    })
  })
})
