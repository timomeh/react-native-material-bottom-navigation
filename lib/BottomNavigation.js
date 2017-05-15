/**
 * Bottom Navigation like Material Design Guidelines.
 * As best as I can. Everybody freak out.
 * @flow
 */

import React, { Component } from 'react'
import {
  View,
  Platform,
  UIManager,
  StyleSheet,
  findNodeHandle,
  LayoutAnimation,
  TouchableWithoutFeedback
} from 'react-native'
import RippleBackgroundTransition from './RippleBackgroundTransition'
import PressRipple from './PressRipple'
import Tab from './Tab'


type BottomNavigationProps = {
  activeTab: number,
  labelColor: string,
  activeLabelColor: string,
  rippleColor: string,
  backgroundColor: string,
  shifting?: ?boolean,
  onTabChange: () => void,
  style: any,
  innerStyle: any,
  children: Array<ReactElement<Tab>>
}

type BottomNavigationState = {
  activeTab: number,
  backgroundColor: string,
  pressRippleColor: string,
  rippleX: number,
  rippleY: number
}

const defaultProps = {
  activeTab: 0,
  labelColor: 'rgba(0, 0, 0, 0.54)',
  rippleColor: 'black',
  backgroundColor: 'white',
  onTabChange: () => {}
}

export default class BottomNavigation extends Component {

  static defaultProps: typeof defaultProps
  props: BottomNavigationProps
  state: BottomNavigationState
  layoutWillChange: boolean
  nextActiveTab: number
  iconPositions: Array<{ x: number, y: number }>
  dimensions: { width: number, height: number }

  static defaultProps = defaultProps

  constructor(props: BottomNavigationProps) {
    super(props)

    // Default values
    this.layoutWillChange = false
    this.dimensions = { width: -1, height: -1 }
    this.nextActiveTab = props.activeTab
    this.state = {
      activeTab: props.activeTab,
      backgroundColor: props.backgroundColor,
      pressRippleColor: 'transparent',
      rippleX: 0,
      rippleY: 0
    }

    if (props.activeLabelColor == null) {
      this.props.activeLabelColor = this.props.labelColor
    }

    // Enable LayoutAnimations on Android
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true)
    }
  }

  componentWillMount() {
    const { children } = this.props
    const { activeTab } = this.state
    const { barBackgroundColor } = children[activeTab].props

    this.iconPositions = new Array(children.length).fill({ x: 0, y: 0 })

    if (children.length > 5) {
      if (__DEV__) {
        console.warn('You shouldn\'t put more than 5 Tabs in the ' +
          'BottomNavigation. Styling may break and it\'s against the specs ' +
          'in the Material Design Guidelines.')
      }
    }

    // Set Initial Bar backgroundColor, if Tab has any
    if (barBackgroundColor) {
      this.setState({
        backgroundColor: barBackgroundColor
      })
    }
  }

  componentDidMount() {
    // Measure all icons in order to display Ripples correctly
    setTimeout(() => this._measureIcons())
  }

  componentDidUpdate() {
    // `this.layoutWillChange` will be set to true right before state.activeTab
    // is updated. Then, and only then, we had a true layout change, and thus
    // we want to measure the icons.
    if (this.layoutWillChange) {
      setTimeout(() => this._measureIcons())
      this.layoutWillChange = false
    }
  }

  componentWillReceiveProps(nextProps: BottomNavigationProps) {
    const { activeTab: newTabIndex } = nextProps
    const { activeTab: oldTabIndex } = this.state
    const { nextActiveTab } = this
    const tabAmount = this.props.children.length

    // Change active tab when activeTab-prop changes
    if (newTabIndex !== oldTabIndex && newTabIndex !== nextActiveTab) {
      // Test index out of bounce
      if (newTabIndex < 0 && newTabIndex >= tabAmount) {
        if (__DEV__) console.error(`${newTabIndex} is not a valid tabIndex`)
      } else {
        this.refs[`tab_${newTabIndex}`].setTabActive()
      }
    }
  }

  render() {
    const {
      backgroundColor,
      pressRippleColor,
      rippleX,
      rippleY,
      activeTab
    } = this.state

    var shifting = this.props.shifting != null
      ? this.props.shifting
      : this.props.children.length > 3

    return (
      <View
        ref="navigation"
        style={[ { overflow: 'hidden' }, this.props.style ]}
        onLayout={this._handleOnLayout}
      >
        <View style={[
          this.props.innerStyle,
          styles.container,
          { backgroundColor }
        ]}>
          <RippleBackgroundTransition
            ref="backgroundRipple"
            color={pressRippleColor}
            posX={rippleX}
            posY={rippleY}
          />
          <PressRipple
            ref="pressRipple"
            color={this.props.rippleColor}
            x={rippleX}
            y={rippleY}
          />
          {React.Children.map(this.props.children, (child, tabIndex) => (
            React.cloneElement(child, {
              shifting,
              active: tabIndex === activeTab,
              tabIndex: tabIndex,
              onTabPress: this._handleTabChange,
              ref: `tab_${tabIndex}`,

              // Pass setted props, or inherited props by parent component
              labelColor: child.props.labelColor || this.props.labelColor,
              activeLabelColor: child.props.activeLabelColor ||
                this.props.activeLabelColor,
              barBackgroundColor: child.props.barBackgroundColor ||
                this.props.backgroundColor
            })
          ))}
        </View>
      </View>
    )
  }

  _handleTabChange = ({ tabIndex, barBackgroundColor }) => {
    const { x, y } = this.iconPositions[tabIndex]

    // Directly save the active tab index, but not in the state.
    // This way we can block any componentUpdate when the activeTab prop is
    // set to a value which the BottomNavigation already has.
    // (see componentWillReceiveProps)
    this.nextActiveTab = tabIndex

    // Delegation to next tick will cause smoother animations
    setTimeout(() => {

      // Call onTabChange Event Callback
      this.props.onTabChange(tabIndex, this.state.activeTab)

      // Prepare Ripple Background Animation
      this.setState({
        pressRippleColor: barBackgroundColor,
        rippleX: x + 12, // + 12 because icon has size 24
        rippleY: 28 // 56/2, vertical middle of component
      })

      // Show the PressRipple Animation
      this.refs.pressRipple.run()

      // If color changes, run RippleBackground Animation
      if (this.state.backgroundColor !== barBackgroundColor) {
        this.refs.backgroundRipple.run(() => {
          // After that, set the new bar background color
          this.setState({ backgroundColor: barBackgroundColor })
        })
      }

      // Delegation to next tick, so that LayoutAnimation doesn't apply to
      // Ripple animations
      setTimeout(() => {
        // Make magic LayoutAnimation for next Layout Change
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)

        // Announce that the layout will change. This will cause, that
        // `this._measure()` will be executed in `componentDidUpdate`
        this.layoutWillChange = true

        // Finally, update tab and set it active
        this.setState({ activeTab: tabIndex })
      })
    })
  }

  _handleOnLayout = ({ nativeEvent }) => {
    const { width, height } = nativeEvent.layout

    // Set layout initial
    if (this.dimensions.width === -1 && this.dimensions.height === -1) {
      this.dimensions = { width, height }
    }

    // Measure Icons, if dimensions differ
    if (this.dimensions.width !== width || this.dimensions.height !== height) {
      setTimeout(() => this._measureIcons())
      this.dimensions = { width, height }
    }
  }

  _measureIcons = () => {
    const navHandle = findNodeHandle(this.refs.navigation)

    this.props.children.forEach((child, tabIndex) => {
      // If Component was unmounted meanwhile, stop measuring
      if (this.refs[`tab_${tabIndex}`] == null) return

      this.refs[`tab_${tabIndex}`]
        .getIconRef()
        .measureLayout(navHandle, (x, y) => {
          // Save current icon position
          this.iconPositions[tabIndex] = { x, y }
        })
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
