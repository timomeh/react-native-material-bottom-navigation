import React from 'react'
import { View } from 'react-native'
import { mount } from 'enzyme'

import BackgroundDecorator from '../lib/BackgroundDecorator'
import PressFeedback from '../lib/PressFeedback'
import TabList from '../lib/TabList'
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
    mountedBN = null
    props = {
      style: { position: 'absolute' },
      tabs: [{ key: 'up' }, { key: 'town' }, { key: 'funk' }],
      onTabPress: jest.fn(),
      renderTab: jest.fn(() => <MockTab />)
    }

    // prevent output of warnings because of native RN Components
    console.error = () => {}
  })

  afterEach(() => {
    console.error = consoleError
  })

  it('renders BackgroundDecorator', () => {
    expect(bottomNavigation().find(BackgroundDecorator)).toHaveLength(1)
  })

  it('renders PressFeedback', () => {
    expect(bottomNavigation().find(PressFeedback)).toHaveLength(1)
  })

  it('renders TabList', () => {
    expect(bottomNavigation().find(TabList)).toHaveLength(1)
  })

  it('applies styles from props', () => {
    expect(
      bottomNavigation()
        .find(View)
        .first()
        .props().style
    ).toContain(props.style)
  })

  it('passes correct props to TabList', () => {
    const listProps = bottomNavigation()
      .find(TabList)
      .props()
    const bg = bottomNavigation()
      .find(BackgroundDecorator)
      .instance()
    const press = bottomNavigation()
      .find(PressFeedback)
      .instance()

    // passed from root
    expect(listProps).toHaveProperty('tabs', props.tabs)
    expect(listProps).toHaveProperty('onTabPress', props.onTabPress)
    expect(listProps).toHaveProperty('renderTab', props.renderTab)

    // passed from effect components
    expect(listProps).toHaveProperty(
      'setBackgroundColor',
      bg.setBackgroundColor
    )
    expect(listProps).toHaveProperty('addDecorator', bg.addDecorator)
    expect(listProps).toHaveProperty('addFeedbackIn', press.addFeedbackIn)
    expect(listProps).toHaveProperty(
      'enqueueFeedbackOut',
      press.enqueueFeedbackOut
    )
  })
})
