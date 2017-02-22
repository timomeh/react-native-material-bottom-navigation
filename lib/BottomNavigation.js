/**
 *
 * @flow
 */

import React, { Component } from 'react'
import {
  View,
  Platform,
  UIManager,
  TouchableWithoutFeedback,
  LayoutAnimation,
  findNodeHandle
} from 'react-native'
import RippleBackgroundTransition from './RippleBackgroundTransition'


export default class BottomNavigation extends Component {
  constructor(props) {
    super(props)

    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true)
    }

    this.state = {
      activeTab: props.activeTab,
      backgroundColor: 'transparent',
      rippleColor: 'transparent',
      ripplePosX: 0,
      ripplePosY: 0
    }
  }

  componentWillMount() {
    this.setState({
      backgroundColor: this.props.children[this.state.activeTab].props.barColor
    })
  }

  _onTabPress = (newTab, barColor, icon) => {
    icon.measureLayout(findNodeHandle(this.refs._bn), (x, y) => {
      this.setState({ rippleColor: barColor, ripplePosX: x + 12, ripplePosY: y + 12 })
      setTimeout(() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        this.setState({ activeTab: newTab })
      }, 80)
      this.refs.ripple.run(() => {
        this.setState({ backgroundColor: barColor })
      })
    })
  }

  render() {
    const { backgroundColor, rippleColor, ripplePosX, ripplePosY } = this.state

    return (
      <View ref="_bn" elevation={8} style={this.props.style}>
        <View style={{ flex: 1, flexDirection: 'row', backgroundColor, justifyContent: 'center', alignItems: 'center' }}>
          <RippleBackgroundTransition ref="ripple" color={this.state.rippleColor} posX={ripplePosX} posY={ripplePosY} />
          {React.Children.map(this.props.children, (child, i) => (
            React.cloneElement(child, {
              shifting: this.props.children.length > 3,
              active: i === this.state.activeTab,
              tabNumber: i,
              onTabPress: this._onTabPress
            })
          ))}
        </View>
      </View>
    )
  }
}
