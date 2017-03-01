# Material Design Bottom Navigation for react-native

A highly accurate Bottom Navigation Component for react-native, based on [Material Guidelines' Bottom Navigation](https://material.io/guidelines/components/bottom-navigation.html).

* Support for iOS and Android (it's programmed only in JavaScript)
* Uses those dope Ripple Transitions between two background colors
* Highly configurable
* Follows the Guidelines as best as I can
* No dependencies
* Switches automatically between Fixed Navigation (up to 3 tabs) and Shifting Navigation (3 - 5 tabs)
* Support for [react-navigation](https://reactnavigation.org)


**Fixed bottom navigation bar**

![with 3 tabs in white](.github/white-3-tab.gif) ![with 3 tabs in color](.github/color-3-tab.gif)

**Shifting bottom navigation bar**

![with 4 tabs in white](.github/white-4-tab.gif) ![with 4 tabs in color](.github/color-4-tab.gif)


- [Install](#install)
- [But how? (Usage)](#but-how)
- [Configuration](#configuration)
- [Notes](#notes)
- [Usage for react-navigation](#usage-for-react-navigation)
- [Roadmap](#roadmap)
- [LICENSE](#license)

## Install

```sh
# via npm
$ npm install react-native-material-bottom-navigation --save

# via yarn
$ yarn add react-native-material-bottom-navigation
```


## But how?

This is an example for a Bottom Navigation with 4 Tabs, each Tab has its own background color.

In this example, I used [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons) as Icon Components. You can use whatever Component you want.

```jsx
import React, { Component } from 'react'
import BottomNavigation, { Tab } from 'react-native-material-bottom-navigation'
import Icon from 'react-native-vector-icons/MaterialIcons'

class MyComponent extends Component {
  render() {
    return (
      <BottomNavigation
        labelColor="white"
        rippleColor="white"
        style={{ height: 56, elevation: 8, position: 'absolute', left: 0, bottom: 0, right: 0 }}
        onTabChange={(newTabIndex) => alert(`New Tab at position ${newTabIndex}`)}
      >
        <Tab
          barBackgroundColor="#37474F"
          label="Movies & TV"
          icon={<Icon size={24} color="white" name="tv" />}
        />
        <Tab
          barBackgroundColor="#00796B"
          label="Music"
          icon={<Icon size={24} color="white" name="music-note" />}
        />
        <Tab
          barBackgroundColor="#5D4037"
          label="Books"
          icon={<Icon size={24} color="white" name="book" />}
        />
        <Tab
          barBackgroundColor="#3E2723"
          label="Newsstand"
          icon={<Icon size={24} color="white" name="newspaper" />}
        />
      </BottomNavigation>
    )
  }
}
```

## Configuration

Don't skip this part. You will be happy to know about all the good stuff you can configure here.

### BottomNavigation

| Prop | Description  | Type | Defaut |
|------|--------------|------|--------|
| **`activeTab`** | Index of the preselected Tab, starting from 0. | `number` | `0` |
| **`labelColor`** | Text Color of the Tab's Label. Can be overwritten by the Tab itself. | `string` | `rgba(0, 0, 0, 0.54)` |
| **`activelabelColor`** | Text Color of the active Tab's Label. Can be overwritten by the Tab itself. | `string` | `labelColor` |
| **`rippleColor`** | Color of the small Ripple Effect when the Tab will be pressed. Has opacity of `0.12`. | `string` | `black` |
| **`backgroundColor`** | Background color of the Bottom Navigation. Can be overwritten by the Tab itself, to achive different background colors for each active Tab. | `string` | `white` |
| **`onTabChange`** | Function to be called when a Tab was clicked and changes into active state. Will be called with parameters `(newTabIndex, oldTabIndex) => {}`. | `function` | `noop` |
| **`style`** | **Required.** Style will be directly applied to the component. Use this to set the height of the BottomNavigation (should be 56), to position it, to add shadow and border. The only pre-set rule is `overflow: hidden`. You have to set the other styles yourself! Why? Maybe your designer is a crazy person and demands a height of 80dp, or wants it to be positioned on the top. I got you. | `object` | **Required.** |
| **`__hideWarningForUsingTooManyTabs`** | There will be a warning if you use more than 5 Tabs. You shouldn't use more than 5 Tabs! Setting this to true will suppress this warning, but the prop name will judge you forever. | `boolean` | `false` |

**Hints:**

- Elevation should be `8`
- Height should be `56`
- Width should be 100%
- Follow all specs defined in the [Official Guidelines](https://material.io/guidelines/components/bottom-navigation.html#bottom-navigation-specs)


### Tab

| Prop | Description  | Type | Defaut |
|------|--------------|------|--------|
| **`icon`** | **Required.** Component to render as icon. Should have height and width of `24`. | `ReactElement<*>` | **Required.** |
| **`activeIcon`** | Component to render as icon when the Tab is active. Should have height and width of `24`. Use this to change the color of the icon. | `ReactElement<*>` | `icon` |
| **`label`** | **Required.** Text of the Label. | `string` | **Required.** |
| **`labelColor`** | Text Color of the Label. | `string` | `labelColor` of BottomNavigation |
| **`activeLabelColor`** | Text Color of the Label when the Tab is active. | `string` | `activeLabelColor` of BottomNavigation |
| **`barBackgroundColor`** | Background color for the whole component, if the tab is active. | `string` | `backgroundColor` of BottomNavigation |


## Notes

- **If you store the active tab in your state, don't call `this.setState({ activeTab: ... })` in `onTabChange`.**  
  This would result in crazy animations and a temporary loop of updating the component. Simply use `this.state.activeTab = ...` in this case. This won't update the Component.

## Usage for [react-navigation](https://reactnavigation.org)

**Note: Please try to use the master-branch of react-navigation.** As of writing and implementing this, the latest version is [`1ca18de`](https://github.com/react-community/react-navigation/commit/1ca18dee138905dcc2177bb5251cf8e153c2d419). I don't use hacks or exotic functionalities from react-navigation, so I don't expect this will break in the near future.

This package includes a Component to plug into react-navigation. It is as configurable as the standalone version. To achieve this, it uses a separate configuration inside `tabBarOptions`. You can only set those configurations for the Bottom Navigation inside the `TabNavigatorConfig` of `TabNavigator()` – not inside `static navigationOptions` or inside the `RouteConfigs`.

The following example will explain everything you need to get started.

```jsx

import React from 'react'
import { NavigationComponent } from 'react-native-material-bottom-navigation'
import { TabNavigator } from 'react-navigation'

class MoviesAndTV extends React.Component {
  static navigationOptions = {
    tabBar: {
      label: 'Movies & TV',
      icon: () => (<Icon size={24} color="white" name="tv" />)
    }
  }

  render() { ... }
}

class Music extends React.Component {
  static navigationOptions = {
    tabBar: {
      label: 'Music',
      icon: () => (<Icon size={24} color="white" name="music-note" />)
    }
  }

  render() { ... }
}

class Newsstand extends React.Component {
  static navigationOptions = {
    tabBar: {
      label: 'Newsstand',
      icon: () => (<Icon size={24} color="white" name="Newsstand" />)
    }
  }

  render() { ... }
}

const MyApp = TabNavigator({
  MoviesAndTV: { screen: MoviesAndTV },
  Music: { screen: Music },
  Newsstand: { screen: Newsstand }
}, {
  tabBarComponent: NavigationComponent,
  tabBarPosition: 'bottom',
  tabBarOptions: {
    bottomNavigationOptions: {
      labelColor: 'white',
      rippleColor: 'white',
      tabs: {
        MoviesAndTV: {
          barBackgroundColor: '#37474F'
        },
        Music: {
          barBackgroundColor: '#00796B'
        },
        Newsstand: {
          barBackgroundColor: '#EEEEEE',
          labelColor: '#434343', // like in the standalone version, this will override the already specified `labelColor` for this tab
          activeLabelColor: '#212121',
          activeIcon: <Icon size={24} color="#212121" name="newsstand" />
        }
      }
    }
  }
})
```

### [TabNavigatorConfig](https://reactnavigation.org/docs/navigators/tab#TabNavigatorConfig)

- `tabBarComponent`: Use `NavigationComponent` provided by `react-native-material-bottom-navigation`.
- `tabBarPosition`: Use `bottom`.
- `tabBarOptions`: react-navigation's configuration of the tab bar.


### tabBarOptions

The only options, which will affect the Bottom Navigation, are the following:

- `style`: Corresponds to the `style` prop of [`BottomNavigation`](#BottomNavigation). If no height is specified, it will use `height: 56`. This way you don't need any styling in most cases.
- `bottomNavigationOptions`: The options for the Bottom Navigation, see below.


### bottomNavigationOptions

All options of [`BottomNavigation`](#BottomNavigation) are available. They behave like the options in the standalone version, including fallback- and default-behaviour.

- **`labelColor`**
- **`activeLabelColor`**
- **`rippleColor`**
- **`backgroundColor`**
- **`style`**: If specified, `tabBarOptions.style` won't be used.
- **`__hideWarningForUsingTooManyTabs`**
- **`tabs`**: Configuration for the tabs, see below.

*Note: `activeTab` and `onTabChange` don't have any effect, since this is handled by react-navigation.*


### tabs

Each tab can be configured by its key from `RouteConfigs`. *If you take a look at the example, you will see that `MoviesAndTV`, `Music` and `Newsstand` correspond to each other.*

- **`tab`** is an object with `{ [routeKey]: tabOptions }`

### tabOptions

All options of [`Tab`](#Tab) are available. They behave like the options in the standalone version, including fallback- and default-behaviour.

- **`icon`**: If not specified, the icon inside `static navigationOptions.tabBar` of the scene will be used.
- **`activeIcon`**
- **`label`**: If not specified, the label inside `static navigationOptions.tabBar` of the scene will be used.
- **`labelColor`**
- **`activeLabelColor`**
- **`barBackgroundColor`**


### Why don't you use all the options provided by react-navigation?

At the moment react-navigation changes quite frequently, and I don't want to look for those changes constantly. That's why everything is in its own namespace. Also the Bottom Navigation has some features which are not covered by react-navigation.

I believe it's better to have 100% control over what you're programming, even if this means you need to configure a few more things in your code.

## Roadmap

Check if they are any new features announced in the [Issues](https://github.com/timomeh/react-native-material-bottom-navigation/issues).

## [LICENSE](LICENSE.md)

MIT
