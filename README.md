<h1 align="center">
  <img src="/.github/logo.png" width="612" height="180" alt="react-native-material-bottom-navigation" />
</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/react-native-material-bottom-navigation">
    <img src="https://img.shields.io/npm/v/react-native-material-bottom-navigation.svg?style=for-the-badge" alt="npm version" />
  </a>
  <a href="https://www.npmjs.com/package/react-native-material-bottom-navigation">
    <img src="https://img.shields.io/npm/dm/react-native-material-bottom-navigation.svg?style=for-the-badge" alt="downloads" />
  </a>
</p>
<p align="center">
  <b>A beautiful, customizable and easy-to-use<br />Material Design Bottom Navigation for react-native.</b>
</p>

* **Pure JavaScript.** No native dependencies. No linking. Use it without obstacles.
* **Looks beautiful.** Stunning and fluid animations. You won't believe it's not a native view.
* **Customize it.** You can adjust nearly everything to make it fit perfectly inside your app.
* **Easy to use.** Uses established React patterns, for simple or advanced usage.
* **Pluggable.** Includes customizable Tabs and Badges. Or create and use your own.

## Installation

Using [npm](https://www.npmjs.com/):

```sh
npm install react-native-material-bottom-navigation
```

Or using [yarn](https://yarnpkg.com):

```sh
yarn add react-native-material-bottom-navigation
```

## Table of Contents

* [Installation](#installation)
* [Demo](#demo)
* [Usage](#usage)
* [Documentation](#documentation)
* [Contribute](#contribute)
* [Authors](#authors)
* [License](#license)

## Demo

<p align="center">
  <img src=".github/demo-shifting.gif" width="400" height="180" /><br />
  <small><b>Shifting Tab</b></small>
</p>

<p align="center">
  <img src=".github/demo-full.gif" width="400" height="180" /><br />
  <small><b>Full Tab</b></small>
</p>

<p align="center">
  <img src=".github/demo-icon.gif" width="400" height="180" /><br />
  <small><b>Icon Tab</b></small>
</p>

## Usage

This library uses ["render props"](https://reactjs.org/docs/render-props.html) as simple technique for component composition. The example below shows the basic usage of the Bottom Navigation.

You can also find more [examples](/examples) in the root of this repository.

```js
import BottomNavigation, {
  FullTab
} from 'react-native-material-bottom-navigation'

export default class App extends React.Component {
  tabs = [
    {
      key: 'games',
      icon: 'gamepad-variant',
      label: 'Games',
      barColor: '#388E3C',
      pressColor: 'rgba(255, 255, 255, 0.16)'
    },
    {
      key: 'movies-tv',
      icon: 'movie',
      label: 'Movies & TV',
      barColor: '#B71C1C',
      pressColor: 'rgba(255, 255, 255, 0.16)'
    },
    {
      key: 'music',
      icon: 'music-note',
      label: 'Music',
      barColor: '#E64A19',
      pressColor: 'rgba(255, 255, 255, 0.16)'
    }
  ]

  renderIcon = icon = ({ isActive }) => (
    <Icon size={24} color="white" name={tab.icon} />
  ))

  renderTab = ({ tab, isActive }) => (
    <FullTab
      isActive={isActive}
      key={tab.key}
      label={tab.label}
      renderIcon={this.renderIcon(tab.icon)}
    />
  )

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          {/* Your screen contents depending on current tab. */}
        </View>
        <BottomNavigation
          onTabPress={activeTab => this.setState({ activeTab })}
          renderTab={this.renderTab}
          tabs={this.tabs}
        />
      </View>
    )
  }
}
```

## Documentation

* [Documentation](/docs)
* [API](/docs/api)
  * [`<Badge />`](/docs/api/Badge.md)
  * [`<BottomNavigation />`](/docs/api/BottomNavigation.md)
  * [`<FullTab />`](/docs/api/FullTab.md)
  * [`<IconTab />`](/docs/api/IconTab.md)
  * [`<ShiftingTab />`](/docs/api/ShiftingTab.md)

## Contribute

Contributions are always welcome. Read more in the [Contribution Guides](CONTRIBUTING.md).

Please note that this project is released with a Contributor [Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.

## Authors

**Author**

* Timo Mämecke ([GitHub](https://github.com/timomeh), [Twitter](https://twitter.com/timomeh))

**Contributors**

See [Contributors List](https://github.com/timomeh/react-native-material-bottom-navigation/contributors). Thanks to everyone!

## License

[MIT](LICENSE.md), © 2017 - present Timo Mämecke
