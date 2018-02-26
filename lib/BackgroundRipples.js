import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'

import BackgroundRippleAnimation from './BackgroundRippleAnimation'

export default class BackgroundRipples extends React.Component {
  layout = { width: 0, height: 0 }

  handleLayout = ({ nativeEvent }) => {
    const { width, height } = nativeEvent.layout
    this.layout = { width, height }
  }

  shouldComponentUpdate(nextProps) {
    return this.props.activeRipples.length !== nextProps.activeRipples.length
  }

  render() {
    const { activeRipples, ripples, onAnimationEnd } = this.props

    return (
      <View style={styles.wrap} onLayout={this.handleLayout}>
        {activeRipples.map(rippleKey => {
          const ripple = ripples[rippleKey]

          return (
            <BackgroundRippleAnimation
              key={rippleKey}
              x={ripple.x}
              y={ripple.y}
              color={ripple.color}
              containerWidth={this.layout.width}
              containerHeight={this.layout.height}
              onAnimationEnd={onAnimationEnd(rippleKey)}
            />
          )
        })}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    position: 'relative'
  }
})
