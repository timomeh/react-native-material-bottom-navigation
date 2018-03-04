import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'

import BackgroundRippleAnimation from './BackgroundRippleAnimation'

/**
 * Renders all currently visible ripples.
 */
export default class BackgroundRipples extends React.Component {
  static propTypes = {
    ripples: PropTypes.arrayOf(
      PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
        color: PropTypes.string.isRequired
      })
    ),
    onAnimationEnd: PropTypes.func.isRequired
  }

  layout = { width: 0, height: 0 }

  handleLayout = ({ nativeEvent }) => {
    const { width, height } = nativeEvent.layout
    this.layout = { width, height }
  }

  // Only update if ripples were added or deleted.
  shouldComponentUpdate(nextProps) {
    return this.props.ripples.length !== nextProps.ripples.length
  }

  render() {
    const { ripples, onAnimationEnd } = this.props

    return (
      <View style={styles.wrap} onLayout={this.handleLayout}>
        {ripples.map(ripple => (
          <BackgroundRippleAnimation
            key={ripple.key}
            x={ripple.x}
            y={ripple.y}
            color={ripple.color}
            containerWidth={this.layout.width}
            containerHeight={this.layout.height}
            onAnimationEnd={onAnimationEnd(ripple)}
          />
        ))}
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
