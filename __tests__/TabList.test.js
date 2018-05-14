import React from 'react'
import {
  View,
  TouchableWithoutFeedback,
  UIManager,
  LayoutAnimation
} from 'react-native'
import { mount } from 'enzyme'

import TabList from '../lib/TabList'

const MockTab = () => <View />

UIManager.configureNextLayoutAnimation = jest.fn()
jest.useFakeTimers()

describe('TabList', () => {
  const consoleError = console.error
  let mountedList
  let props
  const tabList = () => {
    if (!mountedList) {
      mountedList = mount(<TabList {...props} />)
    }
    return mountedList
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
      mountedList = null
      props = {
        tabs: [
          { key: 'up', text: 'Up!', barColor: 'green', pressColor: 'green' },
          { key: 'town', text: 'Town!', barColor: 'blue', pressColor: 'blue' },
          { key: 'funk', text: 'Funk!', barColor: 'red', pressColor: 'red' }
        ],
        onTabPress: jest.fn(),
        renderTab: jest.fn(() => <MockTab />),
        setBackgroundColor: jest.fn(),
        addDecorator: jest.fn(),
        addFeedbackIn: jest.fn(),
        enqueueFeedbackOut: jest.fn()
      }
    })

    it('is uncontrolled', () => {
      expect(tabList().instance().isControlled).toBe(false)
    })

    it('initially sets first tab active', () => {
      expect(tabList().state().activeTab).toBe('up')
    })

    it('renders three tabs', () => {
      expect(tabList().find(MockTab)).toHaveLength(3)
    })

    it('calls renderTab three times', () => {
      tabList()
      expect(props.renderTab).toHaveBeenCalledTimes(3)
    })

    it('calls renderTab with correct arguments', () => {
      tabList()
      expect(props.renderTab.mock.calls).toEqual([
        [{ isActive: true, tab: props.tabs[0] }],
        [{ isActive: false, tab: props.tabs[1] }],
        [{ isActive: false, tab: props.tabs[2] }]
      ])
    })

    it('passes touchable props to tab component', () => {
      const tabProps = tabList()
        .find(MockTab)
        .first()
        .props()

      // Just test a few. If they are passed, we can be pretty sure all
      // are passed.
      expect(tabProps).toHaveProperty('onResponderGrant')
      expect(tabProps).toHaveProperty('onResponderMove')
      expect(tabProps).toHaveProperty('onResponderRelease')
    })

    it('handles tab press', () => {
      const fakeEvent = { nativeEvent: {} }
      tabList()
      props.setBackgroundColor.mockClear()

      tabList()
        .find(TouchableWithoutFeedback)
        .at(1)
        .props()
        .onPress(fakeEvent)

      expect(props.onTabPress).toHaveBeenCalledWith(
        props.tabs[1],
        props.tabs[0]
      )

      expect(tabList().state().activeTab).toBe('town')
      expect(props.setBackgroundColor).not.toHaveBeenCalled()
      expect(props.addDecorator).toHaveBeenCalled()
    })

    it('handles tab press in', () => {
      const fakeEvent = { nativeEvent: { pageX: 13, locationY: 37 } }
      tabList()
        .find(TouchableWithoutFeedback)
        .at(0)
        .props()
        .onPressIn(fakeEvent)

      const [[call]] = props.addFeedbackIn.mock.calls

      expect(call).toHaveProperty('x', 13)
      expect(call).toHaveProperty('y', 37)
      expect(call).toHaveProperty('color', 'green')
    })

    it('handles tab press out', () => {
      tabList()
        .find(TouchableWithoutFeedback)
        .at(0)
        .props()
        .onPressOut()

      expect(props.enqueueFeedbackOut).toHaveBeenCalled()
    })
  })

  describe('controlled with three mock tabs', () => {
    beforeEach(() => {
      mountedList = null
      props = {
        tabs: [
          { key: 'up', text: 'Up!', barColor: 'green', pressColor: 'green' },
          { key: 'town', text: 'Town!', barColor: 'blue', pressColor: 'blue' },
          { key: 'funk', text: 'Funk!', barColor: 'red', pressColor: 'red' }
        ],
        activeTab: 'funk',
        onTabPress: jest.fn(),
        renderTab: jest.fn(() => <MockTab />),
        setBackgroundColor: jest.fn(),
        addDecorator: jest.fn(),
        addFeedbackIn: jest.fn(),
        enqueueFeedbackOut: jest.fn()
      }
    })

    it('is controlled', () => {
      expect(tabList().instance().isControlled).toBe(true)
    })

    it('initially sets tab active', () => {
      expect(tabList().state().activeTab).toBe('funk')
    })

    it('calls renderTab with correct arguments', () => {
      tabList()
      expect(props.renderTab.mock.calls).toEqual([
        [{ isActive: false, tab: props.tabs[0] }],
        [{ isActive: false, tab: props.tabs[1] }],
        [{ isActive: true, tab: props.tabs[2] }]
      ])
    })

    it('handles tab press', () => {
      const fakeEvent = { nativeEvent: {} }
      tabList()
        .find(TouchableWithoutFeedback)
        .at(1)
        .props()
        .onPress(fakeEvent)

      expect(props.onTabPress).toHaveBeenCalledWith(
        props.tabs[1],
        props.tabs[2]
      )

      expect(tabList().state().activeTab).not.toBe('town')
    })

    it('updates active tab when prop changes after press', () => {
      // Setup
      const fakeEvent = { nativeEvent: { pageX: 13, locationY: 37 } }
      tabList()
      props.setBackgroundColor.mockClear()

      // Trigger tab press
      tabList()
        .find(TouchableWithoutFeedback)
        .first()
        .props()
        .onPress(fakeEvent)

      // activeTab should not be updated
      expect(tabList().state().activeTab).toBe('funk')

      // Update activeTab
      tabList().setProps({ activeTab: 'up' })

      expect(tabList().state().activeTab).toBe('up')
      expect(props.addDecorator).toHaveBeenCalled()
      expect(props.setBackgroundColor).not.toHaveBeenCalled()
    })

    it('updates active tab when prop changes without press', () => {
      tabList()
      props.setBackgroundColor.mockClear()

      tabList().setProps({ activeTab: 'up' })

      expect(tabList().state().activeTab).toBe('up')
      expect(props.setBackgroundColor).toHaveBeenCalledTimes(1)
    })
  })

  describe('with layout animations', () => {
    beforeEach(() => {
      mountedList = null
      props = {
        tabs: [
          { key: 'up', text: 'Up!', barColor: 'green', pressColor: 'green' },
          { key: 'town', text: 'Town!', barColor: 'blue', pressColor: 'blue' },
          { key: 'funk', text: 'Funk!', barColor: 'red', pressColor: 'red' }
        ],
        useLayoutAnimation: true,
        onTabPress: jest.fn(),
        renderTab: jest.fn(() => <MockTab />),
        setBackgroundColor: jest.fn(),
        addDecorator: jest.fn(),
        addFeedbackIn: jest.fn(),
        enqueueFeedbackOut: jest.fn()
      }
    })

    it('handles tab press', () => {
      const spy = jest.spyOn(LayoutAnimation, 'configureNext')
      const fakeEvent = { nativeEvent: {} }
      tabList()
      props.setBackgroundColor.mockClear()

      tabList()
        .find(TouchableWithoutFeedback)
        .at(1)
        .props()
        .onPress(fakeEvent)

      jest.runAllTimers()

      expect(tabList().state().activeTab).toBe('town')
      expect(spy).toHaveBeenCalled()
    })
  })
})
