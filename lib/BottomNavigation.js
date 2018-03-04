import React from 'react'
import PropTypes from 'prop-types'
import { View, ViewPropTypes, StyleSheet } from 'react-native'

import TabList from './TabList'
import BackgroundRipples from './BackgroundRipples'

export default class BottomNavigation extends React.Component {
  static propTypes = {
    activeTab: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onTabPress: PropTypes.func,
    onTabChangeEnd: PropTypes.func,
    style: ViewPropTypes.style,
    renderTab: PropTypes.func.isRequired,
    tabs: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
          .isRequired
      })
    )
  }
  static defaultProps = {
    onTabPress: () => {},
    onTabChangeEnd: () => {}
  }

  constructor(props) {
    super(props)

    this.isControlled = props.activeTab != null

    // { x, y, color } for the next Ripple Animation.
    // This needs to be temporarily stored for the controlled BottomNavigation,
    // so the data for the Ripple can be restored when props.activeTab changes
    // after a press occured. Solving this through function arguments and
    // passing it back as a prop would be too annoying for the developer.
    // Will be set when a press was triggered and reset to `null` when the
    // tab is visually becoming active.
    this.latestRippleData = null

    const initiallyActiveTab = this.isControlled
      ? props.tabs.find(tab => tab.key === props.activeTab)
      : props.tabs[0]

    this.state = {
      // state.activeTab is only used for the uncontrolled component.
      activeTab: !this.isControlled ? initiallyActiveTab.key : undefined,
      backgroundColor: initiallyActiveTab.backgroundColor,
      backgroundRipples: []
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.isControlled && nextProps.activeTab !== this.props.activeTab) {
      this.setTabActive(nextProps.activeTab)
    }
  }

  getActiveTabKey = () => {
    return this.isControlled ? this.props.activeTab : this.state.activeTab
  }

  /**
   * Called when the Tab changes, and thus the background should be updated.
   * This happens:
   *   - when a Tab was pressed.
   *   - when `props.activeTab` was changed without a Press.
   */
  setTabActive = tabKey => {
    const tab = this.props.tabs.find(({ key }) => key === tabKey)

    // activeTab was modified from outside without a Tab Press.
    // Just update the backgroundColor.
    if (!this.latestRippleData) {
      this.setState({ backgroundColor: tab.backgroundColor })
      return
    }

    // Data for the Ripple is available. We copy and immediately delete it to
    // prevent the case that it's being overridden while this update runs
    // (sidenote: can this happen that fast?), and then we use this data to
    // diplay the Ripple Animation.
    const data = { ...this.latestRippleData }
    this.latestRippleData = null

    this.setState(({ backgroundRipples }) => {
      const newRippleKey = Date.now()

      return {
        activeTab: !this.isControlled ? tabKey : undefined,

        // Add a new ripple to the end of the ripple list.
        backgroundRipples: [
          ...backgroundRipples,
          {
            ...data,
            key: newRippleKey
          }
        ]
      }
    })
  }

  /**
   * Called when an onPress event was triggered on a Tab.
   */
  handleTabPress = tabKey => ({ event, ...data }) => {
    this.latestRippleData = {
      x: event.nativeEvent.pageX,
      y: event.nativeEvent.locationY,
      ...data
    }
    this.props.onTabPress(tabKey, this.getActiveTabKey(), this.latestRippleData)

    // For the uncontrolled component, we also want to trigger a TabChange
    // immediately.
    if (!this.isControlled) {
      this.setTabActive(tabKey)
    }
  }

  /**
   * Called when the Ripple Animation has finished.
   */
  handleBackgroundAnimationEnd = endRipple => () => {
    this.props.onTabChangeEnd(this.getActiveTabKey())

    // Delete the ripple (so it's not longer being rendered) and instead set
    // the new background color.
    this.setState(({ backgroundRipples }) => {
      const remainingRipples = backgroundRipples.filter(ripple => {
        return ripple.key !== endRipple.key
      })

      return {
        backgroundRipples: remainingRipples,
        backgroundColor: endRipple.color
      }
    })
  }

  render() {
    const { backgroundColor, backgroundRipples } = this.state

    return (
      <View style={[{ backgroundColor }, styles.bar, this.props.style]}>
        <View style={styles.tabsContainer}>
          <TabList
            activeTab={this.getActiveTabKey()}
            tabs={this.props.tabs}
            renderTab={this.props.renderTab}
            onTabPress={this.handleTabPress}
          />
        </View>
        <View style={styles.rippleBackgroundContainer}>
          <BackgroundRipples
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
