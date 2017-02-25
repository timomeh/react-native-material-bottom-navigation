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


type Props = {
  activeTab?: number,
  labelColor?: string,
  activeLabelColor?: string,
  rippleColor?: string,
  backgroundColor?: string,
  onTabChange: () => void,
  style?: any,
  children: Array<ReactElement<Tab>>
}

export default class BottomNavigation extends Component {
  props: Props

  state: {
    activeTab: number,
    backgroundColor: string,
    pressRippleColor: string,
    rippleX: number,
    rippleY: number
  }

  isShifting: boolean

  static defaultProps = {
    labelColor: 'rgba(0, 0, 0, 0.54)',
    rippleColor: 'black',
    backgroundColor: 'white',
    onTabChange: () => {}
  }

  constructor(props: Props) {
    super(props)

    this.isShifting = false

    if (props.activeLabelColor == null) {
      this.props.activeLabelColor = this.props.labelColor
    }

    this.state = {
      activeTab: props.activeTab || 0,
      backgroundColor: props.backgroundColor,
      pressRippleColor: 'transparent',
      rippleX: 0,
      rippleY: 0
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

    this.isShifting = children.length > 3

    // Set Initial Bar backgroundColor, if Tab has any
    if (barBackgroundColor) {
      this.setState({
        backgroundColor: barBackgroundColor
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.hasOwnProperty('activeTab')) {
      this.setState({ activeTab: nextProps.activeTab })
    }
  }

  render() {
    const { backgroundColor, pressRippleColor, rippleX, rippleY } = this.state
    return (
      <View
        ref="navigation"
        style={[{ overflow: 'hidden' }, this.props.style ]}
      >
        <View style={[ { backgroundColor },  styles.container ]}>
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
          {React.Children.map(this.props.children, (child, i) => (
            React.cloneElement(child, {
              shifting: this.isShifting,
              active: i === this.state.activeTab,
              tabIndex: i,
              onTabPress: this._onTabPress,

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

  _onTabPress = ({ tabIndex, barBackgroundColor, iconRef}) => {
    // Measure in Relation to whole Component, where Position of clicked icon is
    iconRef.measureLayout(findNodeHandle(this.refs.navigation), (x, y) => {
      // Call onTabChange Event Callback
      this.props.onTabChange(tabIndex, this.state.activeTab)

      // Prepare Ripple Background Animation
      this.setState({
        pressRippleColor: barBackgroundColor,
        rippleX: x + 12, // + 12 because icon has size 24
        rippleY: 28 // 56/2, vertical middle of component
      })

      // Wait 67ms, then start animating the new active Tab
      setTimeout(() => {
        // Make magic LayoutAnimation for next Layout Change
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)

        this.setState({ activeTab: tabIndex })
      }, this.isShifting ? 83 : 67)

      // Show the PressRipple
      this.refs.pressRipple.run()

      // If color changes, run RippleBackgroundTransition
      if (this.state.backgroundColor !== barBackgroundColor) {
        this.refs.backgroundRipple.run(() => {
          // After that, set the new bar background color
          this.setState({ backgroundColor: barBackgroundColor })
        })
      }
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
