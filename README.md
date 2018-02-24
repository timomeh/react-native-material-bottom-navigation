# Material Design Bottom Navigation for react-native

A highly accurate JS Implementation of the Material Design Bottom Navigation Component for react-native, following the [Material Design Guidelines](https://material.io/guidelines/components/bottom-navigation.html).

* Supports iOS, Android and react-native-web (no native dependencies, only JS)
* Uses those dope Ripple Transitions between two background colors
* Zero dependencies
* Supports Badges
* Supports Types for Flow and TypeScript
* Supports [react-navigation](https://reactnavigation.org)

## Background

The Material Design Bottom Navigation looks lovely. That's probably the reason why you're here. Using a Bottom Navigation is a good choice. More and more apps are switching from a Burger Menu and/or [Tabs](https://material.io/guidelines/components/tabs.html) to a Bottom Navigation, including Google Apps.

**Fixed Bottom Navigation**

![with 3 tabs in white](.github/white-3-tab.gif) ![with 3 tabs in color](.github/color-3-tab.gif)

**Shifting Bottom Navigation**

![with 4 tabs in white](.github/white-4-tab.gif) ![with 4 tabs in color](.github/color-4-tab.gif)

## Table of Contents

* [Install](#install)
* [Usage](#usage)
* [Reference](#reference)
  * [BottomNavigation](#bottomnavigation)
  * [Tab](#tab)
  * [Usage with react-navigation](#usage-with-react-navigation)
  * [Behind the Navigation Bar](#behind-the-navigation-bar)
* [Contribute](#contribute)
* [Authors](#authors)
* [License](#license)

## Install

```sh
# via npm
$ npm install react-native-material-bottom-navigation --save

# via yarn
$ yarn add react-native-material-bottom-navigation
```

## Usage

This is an example for a Bottom Navigation with 4 Tabs, each Tab has its own background color.

```js
import React, { Component } from 'react'
import BottomNavigation, { Tab } from 'react-native-material-bottom-navigation'
import Icon from 'react-native-vector-icons/MaterialIcons'

class MyComponent extends Component {
  render() {
    return (
      <BottomNavigation
        labelColor="white"
        rippleColor="white"
        style={{
          height: 56,
          elevation: 8,
          position: 'absolute',
          left: 0,
          bottom: 0,
          right: 0
        }}
        onTabChange={newTabIndex => alert(`New Tab at position ${newTabIndex}`)}
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

You can find more examples in the [`examples/`](examples) directory.

## Reference

### `BottomNavigation`

* **`style`** Object. **Required.**  
  Style will be directly applied to the component. Use this to set the height of the BottomNavigation (should be 56), to position it, to add shadow and border.

* `activeLabelColor` String. Default: value of `labelColor`  
  Text Color of the active Tab's Label. Can be overwritten by the Tab itself.

* `activeTab` Number. Default: `0`  
  Index of the currently active Tab.

* `backgroundColor` String. Default: `white`  
  Background color of the Bottom Navigation. Can be overwritten by the Tab itself, to achieve different background colors for each active Tab.

* `innerStyle` Object.  
  All tabs are wrapped in another container. Use this to add styles to this container. The main reason why you would want to use this is to put the Navigation behind the Android System Navigation Bar. Check _[Behind the Navigation Bar](#behind-the-navigation-bar)_ for an example.

* `labelColor` String. Default: `rgba(0, 0, 0, 0.54)`  
  Text Color of the Tab's Label. Can be overwritten by the Tab itself.

* `onTabChange` Function. Arguments: `(newTabIndex, oldTabIndex)`  
  Function to be called when a Tab was pressed and changes into active state.

* `rippleColor` String. Default: `black`  
  Color of the small Ripple Effect when the Tab will be pressed. Has opacity of `0.12`.

* `shifting` Boolean. Default: `true` when >= 4 Tabs, otherwise `false`  
  Turn shifting manually on/off.

### `Tab`

* **`icon`** ReactElement. **Required.**  
  Component to render as icon. Should have height and width of `24`.

* **`label`** String. **Required.**  
  Text of the Label.

* `activeIcon` ReactElement.  
  Component to render as icon when the Tab is active. Should have height and width of `24`. Can be used to change to color of the icon.

* `activeLabelColor` String. Default: value of `BottomNavigation.activeLabelColor`  
  Text Color of the Label when the Tab is active.

* `badgeSize` Number. Default: `20`  
  Size of the badge.

* `badgeStyle` Object.

  * `badgeStyle.container` Object.  
     Style of the badge itself.
  * `badgeStyle.text` Object.  
     Style of the badge inner text.

* `badgeText` String.
  Text for the tab's badge. The badge will be hidden if no badgeText is passed. Can be overridden by `isBadgeVisible`.

* `barBackgroundColor` String.  
  Background color of the `BottomNavigation`, when the tab is active.

* `onPress` Function. Arguments: `(newTabIndex)`  
  Function to be called when the Tab was pressed. When you use this, the pressed tab won't be active automatically. You need to set it to active by setting `BottomNavigation.activeTab`.

* `isBadgeVisible` Boolean.  
  Determines if the badge is visible.

* `labelColor` String. Default: `BottomNavigation.labelColor`  
  Text Color of the Label.

### Usage with [react-navigation](https://reactnavigation.org)

This package includes a Component called `NavigationComponent` to plug into react-navigation's `tabBarComponent`.

```js
import { NavigationComponent } from 'react-native-material-bottom-navigation'

const MyApp = TabNavigator(
  {
    MoviesAndTV: { screen: MoviesAndTV },
    Music: { screen: Music },
    Newsstand: { screen: Newsstand }
  },
  {
    tabBarComponent: NavigationComponent,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      bottomNavigationOptions: {
        labelColor: 'white',
        backgroundColor: 'red',
        rippleColor: 'white',
        tabs: {
          MoviesAndTV: {
            barBackgroundColor: '#37474F',
            labelColor: 'black'
          },
          Music: {
            /* ... */
          },
          Newsstand: {
            /* ... */
          }
        }
      }
    }
  }
)
```

Put the configurations for the `BottomNavigation` inside `bottomNavigationOptions`. Each Tab can also have configurations, which are inside `bottomNavigationOptions.tabs.YourTabName`.

You can only set those configurations for the Bottom Navigation inside the `TabNavigatorConfig` of `TabNavigator()` – Those custom options can't be put in `static navigationOptions` or inside the `RouteConfigs`.

### Behind the Navigation Bar

![behind navigation bar](.github/behind-nav-bar.gif)

In the Material Design Guidelines you can see examples with the Bottom Navigation behind the Software Navigation Bar. That looks pretty sweet. In theory, that's pretty simple. In practice there's a problem: Not every device has a visible Navigation Bar. If someone has hardware buttons on his phone, the Navigation Bar is usually hidden. As of now, we can't simply detect if it's visible. If you don't detect it and just add the following code, the BottomNavigation will have a huge padding-bottom on devices without a Navigation Bar.

See [Issue #28](https://github.com/timomeh/react-native-material-bottom-navigation/issues/28) for more informations with a possible solution.

However, if you know what you're doing, you only need to follow two simple steps:

<details>
<summary>Step 1</summary>
In order to make the System Navigation translucent, you have to add this to `android/app/src/main/res/values/styles.xml`:

```xml
<!-- Customize your theme here. -->
<item name="android:navigationBarColor">@android:color/transparent</item>
<item name="android:windowTranslucentNavigation">true</item>
```

</details>

<details>
<summary>Step 2</summary>
The System Navigation has a height of 48dp. The Bottom Navigation should be 56dp tall. This makes a total height of 104. Use `innerStyle` to push the tabs above the System Navigation without pushing the whole Bottom Navigation above it.

```js
<BottomNavigation
  style={{ height: 104, ... }}
  innerStyle={{ paddingBottom: 48 }}
>
  {/* ... */}
</BottomNavigation>
```

You're done!

</details>

## Contribute

Contributions are always welcome. You can contribute by [opening an issue](https://github.com/timomeh/react-native-material-bottom-navigation/issues/new) or by submitting PRs.

Please note that this project is released with a Contributor [Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.

## Authors

**Author**

* Timo Mämecke ([GitHub](https://github.com/timomeh), [Twitter](https://twitter.com/timomeh))

**Contributors**

See [Contributors List](https://github.com/timomeh/react-native-material-bottom-navigation/contributors). Thanks to everyone!

## License

[MIT](LICENSE.md), © 2017 - 2018 Timo Mämecke
