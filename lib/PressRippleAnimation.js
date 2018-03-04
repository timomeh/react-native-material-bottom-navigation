import React from 'react'
import PropTypes from 'prop-types'
import { Animated, Dimensions, Platform } from 'react-native'

import * as easings from './utils/easing'

export default class PressRippleAnimation extends React.PureComponent {
  static propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    color: PropTypes.string,
    onAnimationEnd: PropTypes.func.isRequired
  }
  static defaultProps = {
    color: 'rgba(0, 0, 0, 0.18)'
  }

  state = {
    animation: new Animated.Value(0)
  }

  componentDidMount() {
    this.startAnimation()
  }

  startAnimation = () => {
    Animated.timing(this.state.animation, {
      toValue: 1,
      duration: 400,
      easing: easings.easeOut,
      useNativeDriver: Platform.OS === 'android'
    }).start(() => {
      this.props.onAnimationEnd()
    })
  }

  render() {
    const { x, y, color } = this.props

    const scale = this.state.animation.interpolate({
      inputRange: [0, 0.66, 1],
      outputRange: [0.01, 1, 1]
    })
    const opacity = this.state.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 1]
    })

    const size = 100

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
