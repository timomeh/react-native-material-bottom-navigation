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
import { easeInOut } from './utils/easing'


const useNativeDriver = Platform.OS === 'android'

type TabProps = {
  active: boolean,
  shifting: boolean,
  tabIndex: number,
  barBackgroundColor: string,
  icon: ReactElement<*>,
  activeIcon?: ReactElement<*>,
  label: string,
  labelColor: string,
  activeLabelColor?: string,
  onTabPress: () => void
}

type TabState = {
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

export default class Tab extends Component {

  props: TabProps
  state: TabState
  didOnceBecameActive: boolean

  constructor(props: TabProps) {
    super(props)
    const { active } = props

    // HACK: In shifting mode, after the first animation from active to
    //   inactive, the icon jumps down before animating to the active state
    //   again. In order to fix this, we need to store, if it already was
    //   active. Then we can catch that case and manually move it up before
    //   animating. This only happens in Android, not iOS.
    //   Is this a bug in react-native or somewhere here?
    this.didOnceBecameActive = props.active ? true : false

    this.state = {
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
  componentWillReceiveProps(nextProps: TabProps) {
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
          {this._renderIcon()}
          {this._renderLabel()}
        </View>
      </TouchableWithoutFeedback>
    )
  }

  _renderIcon = () => {
    const mode = this._getModeString()
    const { active, icon, activeIcon } = this.props

    return (
      <Animated.View
        style={[
          styles.icon,
          { transform: [{ translateY: this.state[mode].iconY }] },
          { opacity: this.state[mode].iconOpacity }
        ]}
      >
        <View ref="_bnic" collapsable={false}>
          {active && activeIcon ? activeIcon : icon}
        </View>
      </Animated.View>
    )
  }

  _renderLabel = () => {
    const { active, labelColor, activeLabelColor, label } = this.props

    return (
      <Animated.Text
        style={[
          { color: active && activeLabelColor ? activeLabelColor : labelColor },
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
        {label}
      </Animated.Text>
    )
  }

  _animateFixedInactiveToActive = () => {
    const duration = 266
    const easing = easeInOut

    Animated.parallel([
      Animated.timing(this.state.fixed.iconY,
        { toValue: -2, duration, easing, useNativeDriver }),
      Animated.timing(this.state.fixed.labelScale,
        { toValue: 1, duration, easing, useNativeDriver }),
      Animated.timing(this.state.fixed.labelY,
        { toValue: 0, duration, easing, useNativeDriver }),
      Animated.timing(this.state.fixed.iconOpacity,
        { toValue: 1, duration, easing, useNativeDriver })
    ]).start()
  }

  _animateFixedActiveToInactive = () => {
    const duration = 266
    const easing = easeInOut

    Animated.parallel([
      Animated.timing(this.state.fixed.iconY,
        { toValue: 0, duration, easing, useNativeDriver }),
      Animated.timing(this.state.fixed.labelScale,
        { toValue: 0.857, duration, easing, useNativeDriver }),
      Animated.timing(this.state.fixed.labelY,
        { toValue: 2, duration, easing, useNativeDriver }),
      Animated.timing(this.state.fixed.iconOpacity,
        { toValue: 0.8, duration, easing, useNativeDriver })
    ]).start()
  }

  _animateShiftingInactiveToActive = () => {
    const easing = easeInOut

    // HACK: See above "didOnceBecameActive"
    if (Platform.OS === 'android') {
      if (this.didOnceBecameActive) this.state.shifting.iconY.setValue(0)
      this.didOnceBecameActive = true
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
    this.setTabActive()
  }

  setTabActive = () => {
    // Setting the tab active is job of the BottomNavigation Component,
    // so call it's function to handle that.
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

  getIconRef = () => {
    return this.refs._bnic
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
    flex: 1
  },
  shiftingActiveContainer: {
    maxWidth: 168,
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
  }
})
