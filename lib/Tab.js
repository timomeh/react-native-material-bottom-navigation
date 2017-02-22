/**
 *
 * @flow
 */

import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Animated,
  TouchableWithoutFeedback,
  Platform,
  Easing
} from 'react-native'

export default class Tab extends Component {

  state: {
    fixed: {
      iconY: number,
      labelScale: number,
      labelY: number
    }
  }

  static defaultProps = {
    active: false,
    shifting: false
  }

  constructor(props) {
    super(props)

    this.state = { }

    if (!props.shifting) {
      this.state.fixed = {
        iconY: props.active ? new Animated.Value(-2) : new Animated.Value(0),
        labelScale: props.active ? new Animated.Value(1) : new Animated.Value(0.857),
        labelY: props.active ? new Animated.Value(0) : new Animated.Value(2),
        iconOpacity: props.active ? new Animated.Value(1) : new Animated.Value(0.8)
      }
    } else {
      this.state.shifting = {
        labelOpacity: props.active ? new Animated.Value(1) : new Animated.Value(0),
        iconY: props.active ? new Animated.Value(1) : new Animated.Value(8),
        iconOpacity: props.active ? new Animated.Value(1) : new Animated.Value(0.8)
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const { props } = this
    let duration = 200

    // Fixed mode
    if (!props.shifting) {
      // If tab is inactive and going to be active
      if (!props.active && nextProps.active) {
        Animated.parallel([
          Animated.timing(this.state.fixed.iconY, { toValue: -2, duration }),
          Animated.timing(this.state.fixed.labelScale, { toValue: 1, duration }),
          Animated.timing(this.state.fixed.labelY, { toValue: 0, duration }),
          Animated.timing(this.state.fixed.iconOpacity, { toValue: 1, duration })
        ]).start()
      }

      // If tab is active and going to be inactive
      if (props.active && !nextProps.active) {
        Animated.parallel([
          Animated.timing(this.state.fixed.iconY, { toValue: 0, duration }),
          Animated.timing(this.state.fixed.labelScale, { toValue: 0.857, duration }),
          Animated.timing(this.state.fixed.labelY, { toValue: 2, duration }),
          Animated.timing(this.state.fixed.iconOpacity, { toValue: 0.8, duration })
        ]).start()
      }
    }

    // Shifting mode
    if (props.shifting) {
      // If tab is inactive and going to be active
      if (!props.active && nextProps.active) {

        // FIXME: For some bizarre reason, the icon in android jumps down at the
        // beginning of the animation. don't know why, but this fixes it.
        if (Platform.OS === 'android') {
          this.state.shifting.iconY = new Animated.Value(4)
        }

        Animated.parallel([
          Animated.timing(this.state.shifting.iconY, { toValue: 0, duration }),
          Animated.timing(this.state.shifting.labelOpacity, { toValue: 1, duration: 60, delay: 140 }),
          Animated.timing(this.state.shifting.iconOpacity, { toValue: 1, duration })
        ]).start()
      }

      // If tab is active and going to be inactive
      if (props.active && !nextProps.active) {
        Animated.parallel([
          Animated.timing(this.state.shifting.iconY, { toValue: 8, duration }),
          Animated.timing(this.state.shifting.labelOpacity, { toValue: 0, duration: 60 }),
          Animated.timing(this.state.shifting.iconOpacity, { toValue: 0.8, duration })
        ]).start()
      }
    }
  }

  _handleTabPress = () => {
    this.props.onTabPress(this.props.tabNumber, this.props.barColor, this.refs._bnic)
  }

  _renderShifting = () => {
    const { icon, label, active } = this.props

    return (
      <TouchableWithoutFeedback onPress={this._handleTabPress}>
        <View style={[
          styles.container,
          active ? styles.shiftingActiveContainer : styles.shiftingInactiveContainer
        ]}>
          <Animated.View style={[
            styles.icon,
            { transform: [{ translateY: this.state.shifting.iconY }] },
            { opacity: this.state.shifting.iconOpacity }
          ]}><View ref="_bnic" collapsable={false}>{icon}</View></Animated.View>
          <Animated.Text style={[
            styles.label,
            { opacity: this.state.shifting.labelOpacity }
          ]}>{label}</Animated.Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  _renderFixed = () => {
    const { icon, label } = this.props

    return (
      <TouchableWithoutFeedback onPress={this._handleTabPress}>
        <View style={styles.container}>
          <Animated.View style={[
            styles.icon,
            { transform: [{ translateY: this.state.fixed.iconY }] },
            { opacity: this.state.fixed.iconOpacity }
          ]}><View ref="_bnic" collapsable={false}>{icon}</View></Animated.View>
          <Animated.Text style={[
            styles.label,
            { transform: [
              { scale: this.state.fixed.labelScale },
              { translateY: this.state.fixed.labelY }
            ] }
          ]}>{label}</Animated.Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  render() {
    return this.props.shifting ?
      this._renderShifting() :
      this._renderFixed()
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
    paddingRight: 12
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
    height: 24
  },
  label: {
    fontSize: 14,
    color: 'white',
    justifyContent: 'flex-end',
    backgroundColor: 'transparent'
  },
  pressRipple: {
    position: 'absolute',
    top: -7,
    left: 0,
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'black'
  }
})
