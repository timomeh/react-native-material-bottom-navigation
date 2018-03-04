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
    onPress: PropTypes.func.isRequired,
    style: ViewPropTypes.style,
    isActive: PropTypes.bool.isRequired,
    animationDuration: PropTypes.number,
    animationEasing: PropTypes.func,
    iconAnimation: PropTypes.func,
    backgroundColor: PropTypes.string,
    pressColor: PropTypes.string,
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

  handlePress = event => {
    const { onPress, backgroundColor, pressColor } = this.props
    onPress({ event, pressColor, rippleColor: backgroundColor })
  }

  render() {
    const { isActive } = this.props
    const { activeStateTransition } = this.state
    const iconTransitions = this.props.iconAnimation(activeStateTransition)

    return (
      <TouchableWithoutFeedback onPress={this.handlePress}>
        <View style={[styles.tab, this.props.style]}>
          <Animated.View style={iconTransitions}>
            {this.props.renderIcon({ isActive })}
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
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
