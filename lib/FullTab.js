import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Text,
  ViewPropTypes,
  Animated,
  StyleSheet,
  Platform,
  TouchableWithoutFeedback
} from 'react-native'

import * as easings from './utils/easing'

/**
 * A Tab with a label and an icon.
 */
export default class FullTab extends React.Component {
  static propTypes = {
    /** If `true`, the tab is visually active. */
    isActive: PropTypes.bool.isRequired,
    /** Extends the style of the tab's view. */
    style: ViewPropTypes.style,
    /** The render prop to render the icon. Arguments: `({ isActive })` */
    renderIcon: PropTypes.func.isRequired,
    /** The render prop to render the badge. Arguments: `({ isActive })` */
    renderBadge: PropTypes.func,
    /** If `true`, the badge will be rendered. */
    showBadge: PropTypes.bool,
    /** Extends the style of the badge's wrapping View. */
    badgeSlotStyle: ViewPropTypes.style,
    /** The text of the label. */
    label: PropTypes.string.isRequired,
    /** Extends the style of the label. */
    labelStyle: Text.propTypes.style,
    /** Useful to add more props to the Text component of the label. */
    labelProps: PropTypes.object,
    /** The duration of the animation between active and inactive. */
    animationDuration: PropTypes.number,
    /** The easing function of the animation between active and inactive. */
    animationEasing: PropTypes.func,
    /**
     * Defines the animation of the icon from active to inactive. Receives the
     * animation progress (`AnimatedValue` between 0 and 1), needs to return a
     * style object.
     * See also: https://facebook.github.io/react-native/docs/animations.html#interpolation
     */
    iconAnimation: PropTypes.func,
    /**
     * Defines the animation of the label from active to inactive. Receives the
     * animation progress (`AnimatedValue` between 0 and 1), needs to return a
     * style object.
     * See also: https://facebook.github.io/react-native/docs/animations.html#interpolation
     */
    labelAnimation: PropTypes.func,
    /**
     * Defines the animation of the badge from active to inactive. Receives the
     * animation progress (`AnimatedValue` between 0 and 1), needs to return a
     * style object.
     * See also: https://facebook.github.io/react-native/docs/animations.html#interpolation
     */
    badgeAnimation: PropTypes.func
  }

  static defaultProps = {
    animationDuration: 160,
    animationEasing: easings.easeInOut,
    showBadge: false,
    labelProps: { numberOfLines: 1 },
    iconAnimation: progress => ({
      transform: [
        {
          translateY: progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -2]
          })
        }
      ],
      opacity: progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0.8, 1]
      })
    }),
    labelAnimation: progress => ({
      transform: [
        {
          scale: progress.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 1.12]
          })
        },
        {
          translateY: progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -1]
          })
        }
      ],
      opacity: progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0.8, 1]
      })
    }),
    badgeAnimation: progress => ({
      transform: [
        {
          scale: progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0.9, 1]
          })
        }
      ]
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

  render() {
    const {
      isActive,
      style,
      label,
      labelStyle,
      labelProps,
      renderIcon,
      renderBadge,
      showBadge,
      badgeSlotStyle,
      animationDuration,
      animationEasing,
      iconAnimation,
      badgeAnimation,

      // `rest` includes the Responder Props from TouchableWithoutFeedback,
      // which need to be spreaded to the first `View`.
      ...rest
    } = this.props
    const { activeStateTransition } = this.state
    const iconTransitions = this.props.iconAnimation(activeStateTransition)
    const labelTransitions = this.props.labelAnimation(activeStateTransition)
    const badgeTransitions = this.props.badgeAnimation(activeStateTransition)

    return (
      <View style={[styles.tab, style]} {...rest}>
        <Animated.View style={iconTransitions}>
          {renderIcon({ isActive })}
        </Animated.View>
        <Animated.View style={labelTransitions}>
          <Text style={[styles.label, labelStyle]} {...labelProps}>
            {label}
          </Text>
        </Animated.View>
        <View style={styles.overlay}>
          <Animated.View
            style={[badgeTransitions, styles.badgeSlot, badgeSlotStyle]}
          >
            {showBadge && renderBadge({ isActive })}
          </Animated.View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  tab: {
    position: 'relative',
    flex: 1,
    minWidth: 80,
    maxWidth: 168,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
    paddingBottom: 10,
    overflow: 'hidden'
  },
  label: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center'
  },
  overlay: {
    alignItems: 'center',
    justifyContent: 'center',
    ...StyleSheet.absoluteFillObject
  },
  badgeSlot: {
    flex: -1,
    right: -11,
    ...Platform.select({
      ios: { top: -11 },
      android: { top: -14 }
    })
  }
})
