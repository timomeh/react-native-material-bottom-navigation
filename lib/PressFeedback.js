import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'

import PressRippleAnimation from './PressRippleAnimation'

export default class PressFeedback extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired
  }

  state = {
    presses: []
  }

  addFeedbackIn = pressData => {
    this.setState(({ presses }) => ({
      presses: [...presses, pressData]
    }))
  }

  enqueueFeedbackOut = pressKey => {
    this.setState(({ presses }) => ({
      presses: presses.map(
        press =>
          press.key === pressKey ? { ...press, animateOut: true } : press
      )
    }))
  }

  handleOutEnd = outPress => () => {
    this.setState(({ presses }) => ({
      presses: presses.filter(press => press.key !== outPress.key)
    }))
  }

  render() {
    return (
      <React.Fragment>
        <View style={styles.pressFeedbacks}>
          {this.state.presses.map(press => (
            <PressRippleAnimation
              key={press.key}
              x={press.x}
              y={press.y}
              color={press.color}
              size={press.size}
              animateOut={press.animateOut}
              onOutEnd={this.handleOutEnd(press)}
            />
          ))}
        </View>
        {this.props.children(this.addFeedbackIn, this.enqueueFeedbackOut)}
      </React.Fragment>
    )
  }
}

const styles = StyleSheet.create({
  pressFeedbacks: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden'
  }
})
