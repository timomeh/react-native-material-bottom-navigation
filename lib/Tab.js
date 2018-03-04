import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  ViewPropTypes,
  Animated,
  StyleSheet,
  Platform,
  TouchableWithoutFeedback
} from 'react-native'

import * as easings from './utils/easing'

export default class Tab extends React.Component {
  static propTypes = {
    style: ViewPropTypes.style,
    isActive: PropTypes.bool.isRequired,
    animationDuration: PropTypes.number,
    animationEasing: PropTypes.func,
    iconAnimation: PropTypes.func,
    data: PropTypes.object.isRequired,
    renderIcon: PropTypes.func.isRequired
  }

  static defaultProps = {
    animationDuration: 160,
    animationEasing: easings.easeInOut,
    iconAnimation: progress => ({
      transform: [
        {
          scale: progress.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 1.2]
          })
        }
      ],
      opacity: progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0.8, 1]
      })
    })
  }

  constructor(props) {
    super(props)

    this.state = {
      activeStateTransition: new Animated.Value(props.isActive ? 1 : 0)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.isActive && nextProps.isActive) {
      this.animateIn()
    }

    if (this.props.isActive && !nextProps.isActive) {
      this.animateOut()
    }
  }

  animateIn = () => this.animateTo(1)
  animateOut = () => this.animateTo(0)

  animateTo = value => {
    Animated.timing(this.state.activeStateTransition, {
      toValue: value,
      duration: this.props.animationDuration,
      easing: this.props.animationEasing,
      useNativeDriver: Platform.OS === 'android'
    }).start()
  }

  render() {
    const {
      isActive,
      style,
      animationDuration,
      animationEasing,
      data,
      iconAnimation,
      renderIcon,

      // Includes the Responder Props from TouchableWithoutFeedback, which
      // need to be spreaded to the first `View`.
      ...rest
    } = this.props
    const { activeStateTransition } = this.state
    const iconTransitions = this.props.iconAnimation(activeStateTransition)

    return (
      <View style={[styles.tab, style]} {...rest}>
        <Animated.View style={iconTransitions}>
          {renderIcon({ isActive })}
        </Animated.View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    minWidth: 80,
    maxWidth: 168,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
