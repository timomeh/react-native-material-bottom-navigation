import React from 'react'
import PropTypes from 'prop-types'
import { View, ViewPropTypes, StyleSheet } from 'react-native'

import TabList from './TabList'
import BackgroundRipples from './BackgroundRipples'

export default class BottomNavigation extends React.Component {
  static propTypes = {
    style: ViewPropTypes.style,
    renderTab: PropTypes.func.isRequired,
    tabs: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
          .isRequired
      })
    )
  }

  constructor(props) {
    super(props)
    const [initTab] = props.tabs

    this.state = {
      activeTab: initTab.key,
      backgroundColor: initTab.backgroundColor,
      backgroundRipples: {},
      backgroundRippleList: []
    }
  }

  handleTabPress = tabKey => data => {
    this.setState(({ backgroundRipples, backgroundRippleList }) => {
      const rippleKey = Date.now()

      return {
        activeTab: tabKey,
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
            tabs={this.props.tabs}
            renderTab={this.props.renderTab}
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
    zIndex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  rippleBackgroundContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1
  }
})
