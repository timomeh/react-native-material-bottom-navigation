import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'

import BackgroundRippleAnimation from './BackgroundRippleAnimation'

export default class BackgroundDecorator extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired
  }

  state = {
    decorators: [],
    backgroundColor: 'transparent'
  }

  layout = { width: 0, height: 0 }

  addDecorator = decoratorData => {
    this.setState(({ decorators }) => ({
      decorators: [...decorators, { ...decoratorData, key: Date.now() }]
    }))
  }

  setBackgroundColor = backgroundColor => {
    this.setState({ backgroundColor })
  }

  handleLayout = ({ nativeEvent }) => {
    const { width, height } = nativeEvent.layout
    this.layout = { width, height }
  }

  handleAnimationEnd = decorator => () => {
    this.setState(({ decorators }) => ({
      decorators: decorators.filter(d => d.key !== decorator.key),
      backgroundColor: decorator.barColor
    }))
  }

  render() {
    const { backgroundColor, decorators } = this.state

    return (
      <React.Fragment>
        <View
          onLayout={this.handleLayout}
          style={[styles.decorators, { backgroundColor }]}
        >
          {decorators.map(decorator => (
            <BackgroundRippleAnimation
              key={decorator.key}
              x={decorator.x}
              y={decorator.y}
              color={decorator.barColor}
              containerWidth={this.layout.width}
              containerHeight={this.layout.height}
              onAnimationEnd={this.handleAnimationEnd(decorator)}
            />
          ))}
        </View>
        {this.props.children(this.addDecorator, this.setBackgroundColor)}
      </React.Fragment>
    )
  }
}

const styles = StyleSheet.create({
  decorators: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden'
  }
})
