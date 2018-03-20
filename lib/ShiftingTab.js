import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  Platform,
  ViewPropTypes,
  NativeModules,
  LayoutAnimation
} from 'react-native'

import FullTab from './FullTab'

const { UIManager } = NativeModules
const SHIFTING_DURATION = 250
const SHIFTING_EASING = LayoutAnimation.Types.easeInEaseOut
const LAYOUT_ANIMATION_CONFIG = LayoutAnimation.create(
  SHIFTING_DURATION,
  SHIFTING_EASING,
  LayoutAnimation.Properties.opacity
)

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

  state = {
    isActive: false
  }

  componentDidMount() {
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true)
    }
  }

  componentWillReceiveProps(nextProps) {
    // The ShiftingTab stores it's own `isActive` state. We use this to set
    // `isActive` after the prop `isActive` changes to run LayoutAnimations
    // without interfering other Layout changes.
    requestAnimationFrame(() => {
      this.setState({ isActive: nextProps.isActive })
      LayoutAnimation.configureNext(LAYOUT_ANIMATION_CONFIG)
    })
  }

  render() {
    const { isActive } = this.state

    return (
      <FullTab
        {...this.props}
        style={[
          isActive ? styles.activeTab : styles.inactiveTab,
          this.props.style
        ]}
      />
    )
  }
}

const styles = StyleSheet.create({
  activeTab: {
    flex: 1.75,
    maxWidth: 168
  },
  inactiveTab: {
    flex: 1,
    maxWidth: 96
  }
})
