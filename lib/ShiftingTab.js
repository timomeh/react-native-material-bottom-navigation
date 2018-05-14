import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Platform, ViewPropTypes, View } from 'react-native'
import FullTab from './FullTab'

/**
 * A Tab for the shifting bottom navigation bar, implemented according to the
 * Bottom navigation specs.
 * In its inactive state, only the icon is visible.
 * In its active state, the tab's label is also visible, and the tab is wider.
 *
 * **To enable a nice transition between both states, the `BottomNavigation`
 * needs to have the `useLayoutAnimation` prop set to `true`.**
 *
 * The ShiftingTab is basically a [FullTab](./FullTab.md) with
 * predefined style- and animation-props.
 */
export default class ShiftingTab extends React.Component {
  static propTypes = {
    ...FullTab.propTypes,
    /** If `true`, the tab is visually active. */
    isActive: PropTypes.bool.isRequired,
    /** Extends the style of the tab's view. */
    style: ViewPropTypes.style,
    /**
     * Defines the animation of the icon from active to inactive. Receives the
     * animation progress (0-1), needs to return a style object.
     * See also: https://facebook.github.io/react-native/docs/animations.html#interpolation
     */
    iconAnimation: PropTypes.func,
    /**
     * Defines the animation of the label from active to inactive. Receives the
     * animation progress (`AnimatedValue` between 0 and 1), needs to return a
     * style object.
     * See also: https://facebook.github.io/react-native/docs/animations.html#interpolation
     */
    labelAnimation: PropTypes.func,
    /**
     * Defines the animation of the badge from active to inactive. Receives the
     * animation progress (`AnimatedValue` between 0 and 1), needs to return a
     * style object.
     * See also: https://facebook.github.io/react-native/docs/animations.html#interpolation
     */
    badgeAnimation: PropTypes.func
  }

  static defaultProps = {
    iconAnimation: progress => ({
      transform: [
        {
          translateY: progress.interpolate({
            inputRange: [0, 1],
            outputRange: [7, 0]
          })
        }
      ],
      opacity: progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0.8, 1]
      })
    }),
    labelAnimation: progress => ({
      opacity: progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
      })
    }),
    badgeAnimation: progress => ({
      transform: [
        {
          scale: progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0.9, 1]
          })
        },
        {
          translateY: progress.interpolate({
            inputRange: [0, 1],
            outputRange: Platform.select({ ios: [9, 4], android: [6, 0] })
          })
        }
      ]
    })
  }

  render() {
    const { isActive, style } = this.props

    return (
      <FullTab
        {...this.props}
        style={[isActive ? styles.activeTab : styles.inactiveTab, style]}
      />
    )
  }
}

const styles = StyleSheet.create({
  activeTab: {
    minWidth: 96,
    maxWidth: 168,
    flex: 1.75
  },
  inactiveTab: {
    minWidth: 56,
    maxWidth: 96,
    flex: 1
  }
})
