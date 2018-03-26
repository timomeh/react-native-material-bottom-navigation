import React from 'react'
import PropTypes from 'prop-types'
import { Animated, Dimensions, Platform } from 'react-native'

import * as easings from './utils/easing'

export default class BackgroundRippleAnimation extends React.PureComponent {
  static propTypes = {
    containerWidth: PropTypes.number.isRequired,
    containerHeight: PropTypes.number.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    onAnimationEnd: PropTypes.func.isRequired
  }

  state = {
    animation: new Animated.Value(0)
  }

  componentWillMount() {
    this.radius = this.calcRadius()
  }

  componentDidMount() {
    this.startAnimation()
  }

  calcRadius = () => {
    const { containerWidth, containerHeight, x, y } = this.props
    const testVetices = [
      { x: 0, y: 0 }, // top left
      { x: containerWidth, y: 0 }, // top right
      { x: 0, y: containerHeight }, // bottom left
      { x: containerWidth, y: containerHeight } // bottom right
    ]

    const possibleRadii = testVetices.map(vertex => {
      const dX = vertex.x - x
      const dY = vertex.y - y

      const radiusSquared = Math.pow(dX, 2) + Math.pow(dY, 2)
      return Math.sqrt(radiusSquared)
    })

    return Math.max(...possibleRadii)
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
    const { radius } = this
    const diameter = radius * 2

    const scale = this.state.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0.01, 1]
    })
    const opacity = this.state.animation.interpolate({
      inputRange: [0, 0.3, 1],
      outputRange: [0, 1, 1]
    })

    return (
      <Animated.View
        style={{
          position: 'absolute',
          top: y - radius,
          left: x - radius,
          width: diameter,
          height: diameter,
          borderRadius: radius,
          backgroundColor: color,
          transform: [{ scale }],
          opacity
        }}
      />
    )
  }
}
