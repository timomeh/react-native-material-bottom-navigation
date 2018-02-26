import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'

import TabList from './TabList'
import BackgroundRipples from './BackgroundRipples'

export default class BottomNavigation extends React.Component {
  state = {
    activeTab: 0,
    backgroundColor: 'red',
    backgroundRipples: {},
    backgroundRippleList: []
  }

  handleTabPress = index => data => {
    this.setState(({ backgroundRipples, backgroundRippleList }) => {
      const rippleKey = Date.now()

      return {
        activeTab: index,
        backgroundRippleList: [...backgroundRippleList, rippleKey],
        backgroundRipples: {
          ...backgroundRipples,
          [rippleKey]: data
        }
      }
    })
  }

  handleBackgroundAnimationEnd = rippleKey => () => {
    this.setState(({ backgroundRippleList, backgroundRipples }) => {
      const remainingRipples = backgroundRippleList.filter(ripple => {
        return ripple !== rippleKey
      })
      const oldRipple = { ...backgroundRipples[rippleKey] }
      const { [rippleKey]: omit, ...restRipples } = { ...backgroundRipples }

      return {
        backgroundRippleList: remainingRipples,
        backgroundRipples: restRipples,
        backgroundColor: oldRipple.color
      }
    })
  }

  render() {
    const {
      backgroundColor,
      backgroundRippleList,
      backgroundRipples,
      activeTab
    } = this.state

    return (
      <View style={[{ backgroundColor }, styles.bar, this.props.style]}>
        <View style={styles.tabsContainer}>
          <TabList
            activeTab={activeTab}
            tabs={this.props.children}
            onTabPress={this.handleTabPress}
          />
        </View>
        <View style={styles.rippleBackgroundContainer}>
          <BackgroundRipples
            activeRipples={backgroundRippleList}
            ripples={backgroundRipples}
            onAnimationEnd={this.handleBackgroundAnimationEnd}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  bar: {
    overflow: 'hidden'
  },
  tabsContainer: {
    flex: 1,
    position: 'relative',
    zIndex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  rippleBackgroundContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1
  }
})
