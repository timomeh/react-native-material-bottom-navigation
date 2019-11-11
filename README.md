<h1 align="center">
  <img src="/.github/logo.png" width="612" alt="react-native-material-bottom-navigation" />
</h1>

<br />

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

<br />

- **Pure JavaScript.** No native dependencies. No linking. No obstacles.
- **Looks beautiful.** Stunning and fluid animations. You won't believe it's not a native view.
- **Customize it.** You can adjust nearly everything to make it fit perfectly to your app.
- **Easy to use.** Uses established React patterns for both simple and advanced usage.
- **Pluggable.** Includes customizable Tabs and Badges. Not enough? Create and use your own!

<br />

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

- [Installation](#installation)
- [Demo](#demo)
- [Usage](#usage)
- [Documentation](#documentation)
- [Notes](#notes)
- [Contribute](#contribute)
- [Contributors](#contributors)
- [License](#license)

## Demo

<p align="center">
  <img src=".github/demo-shifting.gif" width="400" height="180" /><br />
  <b>Shifting Tab</b>
</p>

<p align="center">
  <img src=".github/demo-full.gif" width="400" height="180" /><br />
  <b>Full Tab</b>
</p>

<p align="center">
  <img src=".github/demo-icon.gif" width="400" height="180" /><br />
  <b>Icon Tab</b>
</p>

## Usage

This library uses ["render props"](https://reactjs.org/docs/render-props.html) as established pattern for component composition. The example below illustrates the basic usage of the Bottom Navigation. All available Props are listed in the [Documentation](#documentation).

Dive into the example below, check out [the example app](/examples/Playground) and take a look at the [Usage Documentation](https://timomeh.gitbook.io/material-bottom-navigation/usage).

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

  state = {
    activeTab: 'games'
  }

  renderIcon = icon => ({ isActive }) => (
    <Icon size={24} color="white" name={icon} />
  )

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
          activeTab={this.state.activeTab}
          onTabPress={newTab => this.setState({ activeTab: newTab.key })}
          renderTab={this.renderTab}
          tabs={this.tabs}
        />
      </View>
    )
  }
}
```

**Note:** Out-of-the-box support for React Navigation (called `NavigationComponent` in earlier releases) was removed with v1. Check [this example](/examples/with-react-navigation.js) for a custom React Navigation integration. [Read more...](#react-navigation-support)

## Documentation

You can also view the entire documentation on GitBook: https://timomeh.gitbook.io/material-bottom-navigation/

- [Usage](/docs/Usage.md)
- [API Reference](/docs/api)
  - [`<Badge />`](/docs/api/Badge.md)
  - [`<BottomNavigation />`](/docs/api/BottomNavigation.md)
  - [`<FullTab />`](/docs/api/FullTab.md)
  - [`<IconTab />`](/docs/api/IconTab.md)
  - [`<ShiftingTab />`](/docs/api/ShiftingTab.md)

## Notes

### React Navigation Support

**Check [this example](/examples/with-react-navigation.js) for a custom React Navigation integration.**

In contrary to earlier releases, this library does not support React Navigation _out of the box_. React Navigation now ships with its own Material Bottom Navigation: [`createMaterialBottomTabNavigator`](https://reactnavigation.org/docs/en/material-bottom-tab-navigator.html).

You can still implement react-native-material-bottom-navigation manually by using React Navigation's [Custom Navigators](https://reactnavigation.org/docs/en/custom-navigators.html#api-for-building-custom-navigators). Check out [this example](/examples/with-react-navigation.js).

### Updated Material Design Specs

Google updated the Material Guidelines on Google I/O 2018 with new specifications, including a slightly changed Bottom Navigation and a new "App Bar Bottom" with a FAB in a centered cutout. react-native-material-bottom-navigation uses the _older_ specs.

## Contribute

Contributions are always welcome. Read more in the [Contribution Guides](CONTRIBUTING.md).

Please note that this project is released with a Contributor [Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars3.githubusercontent.com/u/4227520?v=4" width="100px;" alt="Timo Mämecke"/><br /><sub><b>Timo Mämecke</b></sub>](https://twitter.com/timomeh)<br />[🐛](https://github.com/timomeh/react-native-material-bottom-navigation/issues?q=author%3Atimomeh "Bug reports") [💻](https://github.com/timomeh/react-native-material-bottom-navigation/commits?author=timomeh "Code") [🎨](#design-timomeh "Design") [📖](https://github.com/timomeh/react-native-material-bottom-navigation/commits?author=timomeh "Documentation") [💡](#example-timomeh "Examples") [🚇](#infra-timomeh "Infrastructure (Hosting, Build-Tools, etc)") [🤔](#ideas-timomeh "Ideas, Planning, & Feedback") [👀](#review-timomeh "Reviewed Pull Requests") | [<img src="https://avatars3.githubusercontent.com/u/11575429?v=4" width="100px;" alt="Shayan Javadi"/><br /><sub><b>Shayan Javadi</b></sub>](https://www.shayanjavadi.com/)<br />[💻](https://github.com/timomeh/react-native-material-bottom-navigation/commits?author=ShayanJavadi "Code") | [<img src="https://avatars2.githubusercontent.com/u/14214500?v=4" width="100px;" alt="David"/><br /><sub><b>David</b></sub>](https://github.com/davidmpr)<br />[💻](https://github.com/timomeh/react-native-material-bottom-navigation/commits?author=davidmpr "Code") | [<img src="https://avatars2.githubusercontent.com/u/19354816?v=4" width="100px;" alt="Jayser Mendez"/><br /><sub><b>Jayser Mendez</b></sub>](http://steemia.io)<br />[📖](https://github.com/timomeh/react-native-material-bottom-navigation/commits?author=jayserdny "Documentation") | [<img src="https://avatars0.githubusercontent.com/u/10601911?v=4" width="100px;" alt="Peter Kottas"/><br /><sub><b>Peter Kottas</b></sub>](https://www.facebook.com/tipsforholiday)<br />[💻](https://github.com/timomeh/react-native-material-bottom-navigation/commits?author=PeterKottas "Code") | [<img src="https://avatars0.githubusercontent.com/u/97068?v=4" width="100px;" alt="Matt Oakes"/><br /><sub><b>Matt Oakes</b></sub>](https://mattoakes.net)<br />[💻](https://github.com/timomeh/react-native-material-bottom-navigation/commits?author=matt-oakes "Code") | [<img src="https://avatars0.githubusercontent.com/u/1533112?v=4" width="100px;" alt="Keeley Carrigan"/><br /><sub><b>Keeley Carrigan</b></sub>](http://www.keeleycarrigan.com)<br />[💻](https://github.com/timomeh/react-native-material-bottom-navigation/commits?author=keeleycarrigan "Code") |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| [<img src="https://avatars1.githubusercontent.com/u/177857?v=4" width="100px;" alt="Sean Holbert"/><br /><sub><b>Sean Holbert</b></sub>](http://www.twitter.com/wildseansy)<br />[💻](https://github.com/timomeh/react-native-material-bottom-navigation/commits?author=wildseansy "Code") | [<img src="https://avatars0.githubusercontent.com/u/9802139?v=4" width="100px;" alt="Alessandro Parolin"/><br /><sub><b>Alessandro Parolin</b></sub>](https://github.com/aparolin)<br />[📖](https://github.com/timomeh/react-native-material-bottom-navigation/commits?author=aparolin "Documentation") | [<img src="https://avatars0.githubusercontent.com/u/1837764?v=4" width="100px;" alt="Prashanth Acharya M"/><br /><sub><b>Prashanth Acharya M</b></sub>](https://github.com/prashantham)<br />[📖](https://github.com/timomeh/react-native-material-bottom-navigation/commits?author=prashantham "Documentation") | [<img src="https://avatars1.githubusercontent.com/u/64609?v=4" width="100px;" alt="Alexey Tcherevatov"/><br /><sub><b>Alexey Tcherevatov</b></sub>](https://github.com/lemming)<br />[💻](https://github.com/timomeh/react-native-material-bottom-navigation/commits?author=lemming "Code") [🐛](https://github.com/timomeh/react-native-material-bottom-navigation/issues?q=author%3Alemming "Bug reports") | [<img src="https://avatars2.githubusercontent.com/u/5009188?v=4" width="100px;" alt="Trevor Atlas"/><br /><sub><b>Trevor Atlas</b></sub>](https://blog.trevoratlas.com/)<br />[🐛](https://github.com/timomeh/react-native-material-bottom-navigation/issues?q=author%3Atrevor-atlas "Bug reports") |

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!

## License

[MIT](LICENSE.md), © 2017 - present Timo Mämecke
