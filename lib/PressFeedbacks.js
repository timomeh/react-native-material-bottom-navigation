import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'

import PressRippleAnimation from './PressRippleAnimation'

/**
 * Renders all currently visible press feedbacks.
 */
export default class PressFeedbacks extends React.Component {
  static propTypes = {
    presses: PropTypes.arrayOf(
      PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
        pressColor: PropTypes.string
      })
    ),
    onAnimationEnd: PropTypes.func.isRequired
  }

  // Only update if presses were added or deleted.
  shouldComponentUpdate(nextProps) {
    return this.props.presses.length !== nextProps.presses.length
  }

  render() {
    const { presses, onAnimationEnd } = this.props

    return (
      <View style={styles.wrap} onLayout={this.handleLayout}>
        {presses.map(press => (
          <PressRippleAnimation
            key={press.key}
            x={press.x}
            y={press.y}
            color={press.pressColor}
            onAnimationEnd={onAnimationEnd(press)}
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
