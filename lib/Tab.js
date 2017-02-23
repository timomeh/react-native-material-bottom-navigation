/**
 * Tab in the Bottom Navigation. Consists of Label + Icon.
 * Handles all the fancy animations.
 * @flow
 */

import React, { Component } from 'react'
import {
  View,
  Text,
  Easing,
  Animated,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback
} from 'react-native'
import { easeInOut, easeOut } from './utils/easing'


const useNativeDriver = Platform.OS === 'android'

type Props = {
  active: boolean,
  shifting: boolean,
  tabIndex: number,
  rippleColor?: string,
  barBackgroundColor?: string,
  icon: ReactElement<*>,
  label: string,
  labelColor?: string,
  onTabPress: () => void
}

export default class Tab extends Component {
  props: Props

  state: {
    pressRipple: {
      scale: Animated.Value,
      opacity: Animated.Value
    },
    fixed: {
      labelScale: Animated.Value,
      labelY: Animated.Value,
      iconY: Animated.Value,
      iconOpacity: Animated.Value
    },
    shifting: {
      labelOpacity: Animated.Value,
      labelScale: Animated.Value,
      iconY: Animated.Value,
      iconOpacity: Animated.Value
    }
  }

  maxRippleOpacity: number

  constructor(props: Props) {
    super(props)
    const { active } = props

    this.maxRippleOpacity = 0.12

    this.state = {
      pressRipple: {
        scale: new Animated.Value(0.01),
        opacity: new Animated.Value(this.maxRippleOpacity)
      },
      fixed: {
        iconY: active ? new Animated.Value(-2) : new Animated.Value(0),
        labelScale: active ? new Animated.Value(1) : new Animated.Value(0.857),
        labelY: active ? new Animated.Value(0) : new Animated.Value(2),
        iconOpacity: active ? new Animated.Value(1) : new Animated.Value(0.8)
      },
      shifting: {
        labelOpacity: active ? new Animated.Value(1) : new Animated.Value(0),
        labelScale: active ? new Animated.Value(1) : new Animated.Value(0.857),
        iconY: active ? new Animated.Value(0) : new Animated.Value(8),
        iconOpacity: active ? new Animated.Value(1) : new Animated.Value(0.8)
      }
    }
  }

  // Animations will start as soon as new props are passed through
  componentWillReceiveProps(nextProps: Props) {
    const { props } = this

    const fixedMode = !props.shifting
    const shiftingMode = props.shifting
    const willBeActive = !props.active && nextProps.active
    const willBeInactive = props.active && !nextProps.active

    if (fixedMode && willBeActive) {
      this._animateFixedInactiveToActive()
    } else if (fixedMode && willBeInactive) {
      this._animateFixedActiveToInactive()
    } else if (shiftingMode && willBeActive) {
      this._animateShiftingInactiveToActive()
    } else if (shiftingMode && willBeInactive) {
      this._animateShiftingActiveToInactive()
    }
  }

  render() {
    const { icon, label, active } = this.props

    return (
      <TouchableWithoutFeedback onPress={this._handleTabPress}>
        <View
          style={[
            styles.container,
            (this._isShifting() && active) && styles.shiftingActiveContainer,
            (this._isShifting() && !active) && styles.shiftingInactiveContainer
          ]}
        >
          {this._renderRipple()}
          {this._renderIcon()}
          {this._renderLabel()}
        </View>
      </TouchableWithoutFeedback>
    )
  }

  _renderRipple = () => {
    const { scale, opacity } = this.state.pressRipple

    return (
      <View style={styles.pressRippleContainer}>
        <Animated.View
          style={[
            { backgroundColor: this.props.rippleColor },
            styles.pressRipple,
            { transform: [{ scale }] },
            { opacity }
          ]}
        />
      </View>
    )
  }

  _renderIcon = () => {
    const mode = this._getModeString()

    return (
      <Animated.View
        style={[
          styles.icon,
          { transform: [{ translateY: this.state[mode].iconY }] },
          { opacity: this.state[mode].iconOpacity }
        ]}
      >
        <View ref="_bnic" collapsable={false}>{this.props.icon}</View>
      </Animated.View>
    )
  }

  _renderLabel = () => {
    return (
      <Animated.Text
        style={[
          { color: this.props.labelColor },
          styles.label,
          this._isShifting() && { opacity: this.state.shifting.labelOpacity },
          this._isFixed() && {
            transform: [
              { scale: this.state.fixed.labelScale },
              { translateY: this.state.fixed.labelY }
            ]
          }
        ]}
        numberOfLines={1}
      >
        {this.props.label}
      </Animated.Text>
    )
  }

  _animateFixedInactiveToActive = () => {
    const duration = 200

    Animated.parallel([
      Animated.timing(this.state.fixed.iconY,
        { toValue: -2, duration }),
      Animated.timing(this.state.fixed.labelScale,
        { toValue: 1, duration }),
      Animated.timing(this.state.fixed.labelY,
        { toValue: 0, duration }),
      Animated.timing(this.state.fixed.iconOpacity,
        { toValue: 1, duration })
    ]).start()
  }

  _animateFixedActiveToInactive = () => {
    const duration = 200

    Animated.parallel([
      Animated.timing(this.state.fixed.iconY,
        { toValue: 0, duration }),
      Animated.timing(this.state.fixed.labelScale,
        { toValue: 0.857, duration }),
      Animated.timing(this.state.fixed.labelY,
        { toValue: 2, duration }),
      Animated.timing(this.state.fixed.iconOpacity,
        { toValue: 0.8, duration })
    ]).start()
  }

  _animateShiftingInactiveToActive = () => {
    // FIXME: For some bizarre reason, the icon in android jumps down at the
    // beginning of the animation. don't know why, but this fixes it.
    if (Platform.OS === 'android') {
      this.state.shifting.iconY = new Animated.Value(4)
    }

    Animated.parallel([
      Animated.timing(this.state.shifting.iconY,
        { toValue: 0, duration: 266, easing, useNativeDriver }),
      Animated.timing(this.state.shifting.iconOpacity,
        { toValue: 1, duration: 266, easing, useNativeDriver }),
      Animated.timing(this.state.shifting.labelOpacity,
        { toValue: 1, duration: 183, delay: 83, easing, useNativeDriver }),
      Animated.timing(this.state.shifting.labelScale,
        { toValue: 1, duration: 183, delay: 83, easing, useNativeDriver })
    ]).start()
  }

  _animateShiftingActiveToInactive = () => {
    const easing = easeInOut

    Animated.parallel([
      Animated.timing(this.state.shifting.iconY,
        { toValue: 8, duration: 266, easing, useNativeDriver }),
      Animated.timing(this.state.shifting.labelOpacity,
        { toValue: 0, duration: 83, easing, useNativeDriver }),
      Animated.timing(this.state.shifting.labelScale,
        { toValue: 0.857, duration: 83, easing, useNativeDriver }),
      Animated.timing(this.state.shifting.iconOpacity,
        { toValue: 0.8, duration: 266, easing, useNativeDriver })
    ]).start()
  }

  _handleTabPress = () => {
    // Run Animation for Press Ripple (Feedback)
    const easing = easeOut

    Animated.parallel([
      Animated.timing(this.state.pressRipple.scale,
        { toValue: 1, duration: 200, easing, useNativeDriver }),
      Animated.timing(this.state.pressRipple.opacity,
        { toValue: 0, duration: 300, easing, useNativeDriver })
    ]).start(() => {
      this.state.pressRipple.scale.setValue(0.01)
      this.state.pressRipple.opacity.setValue(this.maxRippleOpacity)
    })

    // Call Callback
    this.props.onTabPress({
      tabIndex: this.props.tabIndex,
      barBackgroundColor: this.props.barBackgroundColor,
      iconRef: this.refs._bnic
    })
  }

  _getModeString = () => {
    if (this.props.shifting) return 'shifting'
    return 'fixed'
  }

  _isShifting = () => {
    return !!this.props.shifting
  }

  _isFixed = () => {
    return !this.props.shifting
  }
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    flex: 1,
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 10,
    paddingLeft: 12,
    paddingRight: 12,
    backgroundColor: 'transparent'
  },
  shiftingInactiveContainer: {
    maxWidth: 96,
    minWidth: 56,
    flex: 1
  },
  shiftingActiveContainer: {
    maxWidth: 168,
    minWidth: 96,
    flex: 1.75
  },
  icon: {
    width: 24,
    height: 24,
    backgroundColor: 'transparent'
  },
  label: {
    fontSize: 14,
    width: 168,
    textAlign: 'center',
    includeFontPadding: false,
    textAlignVertical: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'transparent'
  },
  pressRippleContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  pressRipple: {
    width: 70,
    height: 70,
    borderRadius: 35
  }
})
