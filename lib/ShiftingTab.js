import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Platform, ViewPropTypes, View } from 'react-native'

import FullTab from './FullTab'

export default class ShiftingTab extends React.Component {
  static propTypes = {
    style: ViewPropTypes.style,
    iconAnimation: PropTypes.func,
    labelAnimation: PropTypes.func
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
