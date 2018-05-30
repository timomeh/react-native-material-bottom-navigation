# Usage

The Material Bottom Navigation is designed to be very customizable and pluggable. Instead of a big configuration object, it uses React's [Render Props](https://reactjs.org/docs/render-props.html) to render smaller, customizable Components. If you're new to React and/or Render Props, read the [article on render props](https://reactjs.org/docs/render-props.html) first – or simply dive into the Bottom Navigation and learn it by doing.

You will use render props for

* rendering a Tab (FullTab, IconTab or ShiftingTab).
* rendering an Icon.
* rendering a Badge.

## Step by Step Guide

### The basics

The `BottomNavigation` receives two main props:

* `tabs` is an array of tab objects. Read more about required keys in this object in the [documentation for the tabs array](./api/BottomNavigation.md#tabs)
* `renderTab` is a Render Prop which will be called for each tab, and you have to return a Component.

```js
import { View } from 'react-native'
import BottomNavigation from 'react-native-material-bottom-navigation'
​
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

  render() {
    return (
      <View>
        <BottomNavigation
          renderTab={this.renderTab}
          tabs={this.tabs}
        />
      </View>
    )
  }
  ​
  renderTab = () => {
    return <View />
  }
}
```

This will render just the Bottom Navigation without any Tabs – because we're just returning a blank View Component.

Some notes on the `tabs` Array:

* `key` is required and should be a unique identifier for this tab.
* `barColor` defines the background color of the Bottom Navigation when this Tab is active.
* `pressColor` defines the color of the press feedback.
* The other keys (`icon` and `label`) are just payload, defined by you. You will use those two keys in the next section.

### Rendering a Tab

Now we will render a Tab instead of a blank View:

```js
import { View } from 'react-native'
import BottomNavigation, {
  FullTab
} from 'react-native-material-bottom-navigation'
​
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

  render() {
    return (
      <View>
        <BottomNavigation
          renderTab={this.renderTab}
          tabs={this.tabs}
        />
      </View>
    )
  }
  ​
  renderTab = ({ tab, isActive }) => {
    return (
      <FullTab
        key={tab.key}
        isActive={isActive}
        label={tab.label}
        renderIcon={this.renderIcon}
      />
    )
  }

  renderIcon = ({ isActive }) => {
    return <View />
  }
}
```

The `renderTab` method will be called for each object in our `tabs` array. The method contains an object as parameter, with `tab` and `isActive`.

* `tab` is the tab object, which is currently being rendered. This is the exact same object from our `tabs` array.
* `isActive` tells us if the Tab is currently active.

We use those informations to return a [`FullTab`](./api/FullTab.md), which displays a label and an Icon. The Icon is once again a render prop, similar to the `renderTab` prop. For now we just return a blank `View`, as we did earlier for the Tab.

Instead of a [`FullTab`](./api/FullTab.md), you can also use:

* an [`IconTab`](./api/IconTab.md) which displays just an Icon.
* a [`ShiftingTab`](./api/ShiftingTab.md), which is a FullTab, but the active tab is bigger than the other tabs.
* a Component you created yourself! As a starting point, take a look at the [implementation of the IconTab](https://github.com/timomeh/react-native-material-bottom-navigation/blob/rewrite-cleanup/lib/IconTab.js).

### Rendering an Icon

The Icon can be any Component you want to use, for example [@expo/vector-icons](https://github.com/expo/vector-icons). In fact, the Material Bottom Navigation doesn't include an own Icon Component.

As you see above, the `renderIcon` prop only contains an object as argument with the `isActive` key. We pass more arguments to `renderIcon` using something called a _Thunk_ (or _Curry_, _Higher-order Function_, _Closure_): a function returning a function. This sounds complicated, but are just two small changes:

```js
// ...

renderTab = ({ tab, isActive }) => {
  return (
    <FullTab
      key={tab.key}
      isActive={isActive}
      label={tab.label}
      renderIcon={this.renderIcon(tab.icon)}
    />
  )
}

renderIcon = iconName => ({ isActive }) => {
  return <Icon size={24} color="white" name={iconName} />
}

// ...
```

And you're finished! You now should have a fully functional Bottom Navigation with nice animations.

### Rendering a Badge

The [`Badge`](./api/Badge.md) is a render prop on the Tab Component. You can render _anything_ inside a badge: e.g. a white dot, text, or simply nothing.

```js
import BottomNavigation, {
  FullTab,
  Badge
} from 'react-native-material-bottom-navigation'
// ...

renderBadge = badgeCount => {
  return <Badge>{badgeCount}</Badge>
}

renderTab = ({ tab, isActive }) => {
  return (
    <FullTab
      showBadge={tab.badgeCount > 0}
      renderBadge={this.renderBadge(tab.badgeCount)}
      key={tab.key}
      isActive={isActive}
      label={tab.label}
      renderIcon={this.renderIcon(tab.icon)}
    />
  )
}
```

You have two new props to render a badge:

* `renderBadge`, the render prop to render a badge
* `showBadge` which defines a condition if the badge should be rendered.

Check out the API Documentations of the different Tabs and for the [`Badge`](./api/Badge.md) to see more informations and additional props for Badges.

## Controlled Component

To use the Bottom Navigation as [Controlled Component](https://reactjs.org/docs/forms.html#controlled-components), you can use two additional props:

* `activeTab`: the key of the currently active tab.
* `onTabPress`: event handler when a Tab is being pressed. Parameters are the tab object of the new and old tab.

```js
import BottomNavigation from 'react-native-material-bottom-navigation'
​
export default class App extends React.Component {
  state = {
    activeTab: 'games'
  }

  handleTabPress = (newTab, oldTab) => {
    this.setState({ activeTab: newTab.key })
  }

  render() {
    return (
      <View>
        <BottomNavigation
          activeTab={this.state.activeTab}
          onTabPress={this.handleTabPress}
          renderTab={/* ... */}
          tabs={/* ... */}
        />
      </View>
    )
  }
}
```

## Changing your screen

If you want to display different contents on your screen depending on the active tab, you can use the `onTabPress` prop and save the active tab in your state. Check out the Chapter [Controlled Component](#controlled-component).

You most likely want to use this together with a navigation library, e.g. [React Navigation](https://github.com/react-navigation/react-navigation/) or [React Native Navigation](https://github.com/wix/react-native-navigation).
