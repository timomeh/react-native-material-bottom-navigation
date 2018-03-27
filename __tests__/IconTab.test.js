import React from 'react'
import { View } from 'react-native'
import { shallow } from 'enzyme'

import IconTab from '../lib/IconTab'

const MockIcon = () => <View />
const MockBadge = () => <View />

describe('IconTab', () => {
  const consoleError = console.error
  let mountedTab
  let props
  const tab = () => {
    if (!mountedTab) {
      mountedTab = shallow(<IconTab {...props} />)
    }
    return mountedTab
  }

  beforeEach(() => {
    mountedTab = null
  })

  it('renders an icon component', () => {
    props = {
      isActive: false,
      renderIcon: jest.fn(() => <MockIcon />)
    }

    expect(tab().find(MockIcon)).toHaveLength(1)
    expect(props.renderIcon).toHaveBeenCalledWith({ isActive: false })
  })

  it('renders a badge component', () => {
    props = {
      isActive: false,
      showBadge: true,
      renderIcon: jest.fn(() => <MockIcon />),
      renderBadge: jest.fn(() => <MockBadge />)
    }

    expect(tab().find(MockBadge)).toHaveLength(1)
    expect(props.renderBadge).toHaveBeenCalledWith({ isActive: false })
  })

  it('calls animation functions', () => {
    props = {
      isActive: false,
      renderIcon: jest.fn(() => <MockIcon />),
      iconAnimation: jest.fn(),
      badgeAnimation: jest.fn()
    }

    tab()
    expect(props.iconAnimation).toHaveBeenCalled()
    expect(props.badgeAnimation).toHaveBeenCalled()
  })

  it('handles inactive to active', () => {
    props = {
      isActive: false,
      renderIcon: jest.fn(() => <MockIcon />)
    }
    const spy = jest.spyOn(tab().instance(), 'animateTo')

    tab().setProps({ isActive: true })
    expect(spy).toHaveBeenCalledWith(1)
  })

  it('handles active to inactive', () => {
    props = {
      isActive: true,
      renderIcon: jest.fn(() => <MockIcon />)
    }
    const spy = jest.spyOn(tab().instance(), 'animateTo')

    tab().setProps({ isActive: false })
    expect(spy).toHaveBeenCalledWith(0)
  })

  it('passes responder props', () => {
    props = {
      isActive: true,
      renderIcon: jest.fn(() => <MockIcon />),
      onResponderMove: () => {}
    }

    expect(
      tab()
        .find(View)
        .first()
        .props()
    ).toHaveProperty('onResponderMove', props.onResponderMove)
  })
})
