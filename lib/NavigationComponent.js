/**
 * Pluggable Version for [react-navigation](https://reactnavigation.org/).
 * The BottomNavigation gets its options from a separate namespace in
 * `tabBarOptions` inside TabNavigatorConfig, namely `bottomNavigationOptions`.
 * @flow
 */

import React, { PureComponent } from 'react'
import BottomNavigation, { Tab } from '../'


type NCProps = {
  // I could use react-navigation's type definitions, but I don't want to
  // include it as a dependency or risk throwing an error because the package
  // is not found. So: `any`
  navigationState: any,
  jumpToIndex: (index: number) => void,
  getLabel: (scene: any) => ?(React.Element<*> | string),
  renderIcon: (scene: any) => React.Element<*>,
  style?: any,
  bottomNavigationOptions: any
}

export default
class NavigationComponent extends PureComponent<void, NCProps, void> {
  render() {
    // react-navigation passed props
    const {
      navigationState,
      bottomNavigationOptions,
      getLabel,
      renderIcon,
      jumpToIndex,
      style
    } = this.props

    // BottomNavigation's style
    const { style: bnStyle } = bottomNavigationOptions

    // Builded props for BottomNavigation
    const bnProps = {
      labelColor: bottomNavigationOptions.labelColor,
      activeLabelColor: bottomNavigationOptions.activeLabelColor,
      rippleColor: bottomNavigationOptions.rippleColor,
      backgroundColor: bottomNavigationOptions.backgroundColor,
      __hideWarningForUsingTooManyTabs:
        bottomNavigationOptions.__hideWarningForUsingTooManyTabs
    }

    return (
      <BottomNavigation
        activeTab={navigationState.index}
        // Style has default `height: 56`, so you can in theory skip styling
        // completely. After that, it uses the styles inside the
        // bottomNavigationOptions namespace. Aa a last resort, the styles from
        // `tabBarOptions` will be added.
        style={[ { height: 56 }, bnStyle || style ]}
        onTabChange={(index) => jumpToIndex(index)}
        {...bnProps}
      >
        {navigationState.routes.map((route, index) => {
          const focused = index === navigationState.index

          // scene object for `getLabel` and `renderIcon`
          const scene = { route, index, focused }
          const label = getLabel(scene)
          const icon = renderIcon(scene)

          // Prepare props for the tabs
          const tabs = bottomNavigationOptions.tabs || {}
          const tabOptions = tabs[route.key] || {}
          const tabProps = {
            icon: tabOptions.icon || icon,
            activeIcon: tabOptions.activeIcon,
            label: tabOptions.label || label,
            labelColor: tabOptions.labelColor,
            activeLabelColor: tabOptions.activeLabelColor,
            barBackgroundColor: tabOptions.barBackgroundColor
          }

          return <Tab key={index} {...tabProps} />
        })}
      </BottomNavigation>
    )
  }
}
