import React from 'react'
import { View, Text } from 'react-native'
import { shallow } from 'enzyme'

import Badge from '../lib/Badge'

const MockContent = () => <View />

describe('Badge', () => {
  const consoleError = console.error
  let mountedBadge
  let props
  const badge = () => {
    if (!mountedBadge) {
      mountedBadge = shallow(<Badge {...props} />)
    }
    return mountedBadge
  }

  beforeEach(() => {
    mountedBadge = null
  })

  it('sets styles from props', () => {
    props = { style: { margin: 10 } }
    expect(
      badge()
        .find(View)
        .first()
        .props().style
    ).toContainEqual({ margin: 10 })
  })

  it('can use number as children', () => {
    props = { children: 1 }
    expect(
      badge()
        .find(Text)
        .dive()
        .text()
    ).toBe('1')
  })

  it('can use text as children', () => {
    props = { children: 'A' }
    expect(
      badge()
        .find(Text)
        .dive()
        .text()
    ).toBe('A')
  })

  it('can use component as children', () => {
    props = { children: <MockContent /> }
    expect(badge().find(MockContent)).toHaveLength(1)
  })

  it('sets style of text from props', () => {
    props = { children: 'A', textStyle: { color: 'red' } }
    expect(
      badge()
        .find(Text)
        .props().style
    ).toContainEqual({ color: 'red' })
  })
})
