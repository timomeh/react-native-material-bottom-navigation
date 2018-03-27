import React from 'react'
import { View, Text } from 'react-native'
import { shallow } from 'enzyme'

import ShiftingTab from '../lib/ShiftingTab'
import FullTab from '../lib/FullTab'

const MockIcon = () => <View />
const MockBadge = () => <View />

describe('FullTab', () => {
  const consoleError = console.error
  let mountedTab
  let props
  const tab = () => {
    if (!mountedTab) {
      mountedTab = shallow(<ShiftingTab {...props} />)
    }
    return mountedTab
  }

  beforeEach(() => {
    mountedTab = null
  })

  it('renders a FullTab', () => {
    props = {
      isActive: false,
      renderIcon: jest.fn(() => <MockIcon />),
      label: 'Hit it!'
    }

    expect(tab().find(FullTab)).toHaveLength(1)
  })

  it('sets inactive styles', () => {
    props = {
      isActive: false,
      renderIcon: jest.fn(() => <MockIcon />),
      label: 'Hit it!'
    }

    expect(
      tab()
        .find(FullTab)
        .props().style[0]
    ).toHaveProperty('flex', 1)
  })

  it('sets active styles', () => {
    props = {
      isActive: true,
      renderIcon: jest.fn(() => <MockIcon />),
      label: 'Hit it!'
    }

    expect(
      tab()
        .find(FullTab)
        .props().style[0]
    ).toHaveProperty('flex', 1.75)
  })

  it('passes other props to FullTab', () => {
    props = {
      isActive: false,
      renderIcon: jest.fn(() => <MockIcon />),
      label: 'Hit it!'
    }

    const tabProps = tab()
      .find(FullTab)
      .props()

    expect(tabProps.isActive).toBe(false)
    expect(tabProps.renderIcon).toBe(props.renderIcon)
    expect(tabProps.label).toBe('Hit it!')
  })
})
