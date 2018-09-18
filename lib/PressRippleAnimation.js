import React from 'react'
import PropTypes from 'prop-types'
import { Animated, Dimensions, Platform } from 'react-native'

import * as easings from './utils/easing'

export default class PressRippleAnimation extends React.PureComponent {
  static propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    color: PropTypes.string,
    onInEnd: PropTypes.func,
    onOutEnd: PropTypes.func,
    size: PropTypes.number
  }

  static defaultProps = {
    color: 'rgba(0, 0, 0, 0.18)',
    size: 110,
    onInEnd: () => {},
    onOutEnd: () => {}
  }

  state = {
    animation: new Animated.Value(-1)
  }

  inAnimationFinished = false
  outAnimationRunning = false

  componentDidMount() {
    this.runInAnimation()
  }

  componentWillReceiveProps({ animateOut }) {
    if (animateOut && !this.props.animateOut) {
      this.runOutAnimation()
    }
  }

  runInAnimation = () => {
    Animated.timing(this.state.animation, {
      toValue: 0,
      duration: 400,
      useNativeDriver: Platform.OS === 'android'
    }).start(() => {
      if (this.props.animateOut && !this.outAnimationRunning) {
        this.runOutAnimation()
      }

      this.inAnimationFinished = true
      this.props.onInEnd()
    })
  }

  runOutAnimation = () => {
    this.outAnimationRunning = true

    Animated.timing(this.state.animation, {
      toValue: 1,
      duration: this.inAnimationFinished ? 300 : 400,
      easing: easings.easeInOut,
      useNativeDriver: Platform.OS === 'android'
    }).start(() => {
      this.props.onOutEnd()
    })
  }

  render() {
    const { x, y, color, size } = this.props

    const scale = this.state.animation.interpolate({
      inputRange: [-1, 0, 1],
      outputRange: [0.01, 1, 1.2]
    })
    const opacity = this.state.animation.interpolate({
      inputRange: [-1, 0, 1],
      outputRange: [1, 1, 0]
    })

    return (
      <Animated.View
        style={{
          position: 'absolute',
          top: y - size / 2,
          left: x - size / 2,
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
          transform: [{ scale }],
          opacity
        }}
      />
    )
  }
}
