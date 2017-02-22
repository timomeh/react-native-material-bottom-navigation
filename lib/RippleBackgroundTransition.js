/**
 * Transition from one background color to another using a Ripple Effect
 * @flow
 */

import React, { Component } from 'react'
import {
  View,
  Animated,
  Easing,
  Platform,
  TouchableWithoutFeedback
} from 'react-native'

type IProps = {
  color: string,
  posX: number,
  posY: number
}

export default class RippleBackgroundTransition extends Component {
  props: IProps
  state: {
    animating: boolean,
    distance: number,
    scale: Animated.Value
  }
  scaleInit: number
  layout: {
    x: number,
    y: number,
    width: number,
    height: number
  }

  constructor(props: IProps) {
    super(props)

    this.scaleInit = Platform.OS === 'android' ? 0.01 : 0
    this.layout = { x: 0, y: 0, width: 0, height: 0 }
    this.state = { ...this._initState() }
  }

  _initState = () => {
    return {
      animating: false,
      scale: new Animated.Value(this.scaleInit),
      distance: 0
    }
  }

  _getLargestDistanceToBounds = (x: number, y: number): number => {
    let distance = 0

    const testVectors = [
      [ 0, 0 ],
      [ this.layout.width, 0 ],
      [ this.layout.width, this.layout.height ],
      [ 0, this.layout.height ]
    ]
    const refVector = [ x, y ]

    testVectors.forEach((vector, i) => {
      const dX = vector[0] - refVector[0] // distance on x axis
      const dY = vector[1] - refVector[1] // distance on y axis

      // Pythagoras: a^2 + b^2 = c^2
      // Note: d is now a squared value
      const d = dX*dX + dY*dY

      if (d > distance) distance = d
    })

    // Since we only have the c^2 part of Pythagoras, we need to sqrt it
    return Math.sqrt(distance)
  }

  _handleOnLayout = ({ nativeEvent }: any) => {
    this.layout = { ...nativeEvent.layout }
  }

  run = (callback?: Function = () => {}) => {
    const { posX, posY } = this.props
    const distance = this._getLargestDistanceToBounds(posX, posY)

    this.setState({
      animating: true,
      distance
    })

    Animated.timing(this.state.scale, {
      toValue: 1,
      duration: 255,
      useNativeDriver: Platform.OS === 'android'
    }).start(() => {
      this.setState({ ...this._initState() })
      callback(this.props.color)
    })
  }

  _renderRipple = () => {
    const { distance, scale } = this.state
    const { posX, posY } = this.props

    // Distance is from press position to furthest position on view is the
    // radius of the circle.
    const size = distance * 2

    return (
      <Animated.View
        style={{
          top: posY - distance,
          left: posX - distance,
          position: 'absolute',
          width: size,
          height: size,
          borderRadius: distance,
          transform: [{ scale }],
          backgroundColor: this.props.color
        }}
      />
    )
  }

  render() {
    return (
      <View onLayout={this._handleOnLayout} style={{ position: 'absolute', left: 0, right: 0, bottom: 0, top: 0 }}>
        {this.state.animating && this._renderRipple()}
      </View>
    )
  }
}
