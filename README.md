# Material Design Bottom Navigation for react-native

A highly accurate Bottom Navigation Component for react-native, based on [Material Guidelines' Bottom Navigation](https://material.io/guidelines/components/bottom-navigation.html).

* Support for iOS and Android (it's programmed only in JavaScript)
* Uses those dope Ripple Transitions between two background colors
* Highly configurable
* Follows the Guidelines as best as I can
* No dependencies
* Switches automatically between Fixed Navigation (up to 3 tabs) and Shifting Navigation (3 - 5 tabs)


## Look at it!

Those are screencaptures made on a real device.

**Fixed bottom navigation bar**

![with 3 tabs in white](.github/white-3-tab.gif) ![with 3 tabs in color](.github/color-3-tab.gif)

**Shifting bottom navigation bar**

![with 4 tabs in white](.github/white-4-tab.gif) ![with 4 tabs in color](.github/color-4-tab.gif)


## Install

(Note: Currently not published. Not yet.)

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

**Hints:**

- Elevation should be `8`
- Height should be `56`
- Width should be 100%
- Follow all specs defined in the [Official Guidelines](https://material.io/guidelines/components/bottom-navigation.html#bottom-navigation-specs)


### Tab

| Prop | Description  | Type | Defaut |
|------|--------------|------|--------|
| **`icon`** | **Required.** Component to render as icon. Should be have height and width of `24`. | `ReactElement<*>` | **Required.** |
| **`activeIcon`** | Component to render as icon when the Tab is active. Should be have height and width of `24`. | `ReactElement<*>` | `icon` |
| **`label`** | **Required.** Text of the Label. | `string` | **Required.** |
| **`labelColor`** | Text Color of the Label. | `string` | `labelColor` of BottomNavigation |
| **`activeLabelColor`** | Text Color of the Label when the Tab is active. | `string` | `activeLabelColor` of BottomNavigation |
| **`barBackgroundColor`** | Background color for the whole component, if the tab is active. | `string` | `backgroundColor` of BottomNavigation |


## Roadmap

- Wrapper for [react-navigation](reactnavigation.org)
- Activity Badge for Tab


## [LICENSE](LICENSE.md)

MIT
