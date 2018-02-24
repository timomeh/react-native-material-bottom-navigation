import React, { Component } from 'react'
import { connect } from 'react-redux'
import { AppRegistry, StyleSheet, Text, View, Button } from 'react-native'
import { NavigationComponent } from 'react-native-material-bottom-navigation'
import { TabNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/MaterialIcons'

/**
 * Screen for first tab.
 * You usually will have this in a separate file.
 */
class MoviesAndTV extends Component {
  static navigationOptions = {
    tabBarLabel: 'Movies & TV',
    tabBarIcon: () => <Icon size={24} name="ondemand-video" color="white" />
  }

  render() {
    return (
      <View>
        <Text>Movies & TV</Text>
      </View>
    )
  }
}

/**
 * Screen for second tab.
 * You usually will have this in a separate file.
 */
class Music extends Component {
  static navigationOptions = {
    tabBarLabel: 'Music',
    tabBarIcon: () => <Icon size={24} name="music-note" color="white" />
  }

  render() {
    return (
      <View>
        <Text>Music</Text>
      </View>
    )
  }
}

/**
 * Screen for third tab.
 * You usually will have this in a separate file.
 */
class Books extends Component {
  static navigationOptions = {
    tabBarLabel: 'Books',
    tabBarIcon: () => <Icon size={24} name="book" color="white" />
  }

  render() {
    return (
      <View>
        <Text>Books</Text>
      </View>
    )
  }
}

/**
 * Component which wraps NavigationComponent and is passed additional properties which can
 * dynamically alter the bottomNavigationOptions. For example, you could use Redux to get
 * the unread book count, pass it into this components props, and then change the badge count.
 */
function UnreadBooksNavigationComponent(props) {
  const { unreadBookCount, bottomNavigationOptions, ...rest } = props
  return (
    <NavigationComponent
      bottomNavigationOptions={{
        ...bottomNavigationOptions,
        tabs: {
          ...bottomNavigationOptions.tabs,
          Books: {
            ...bottomNavigationOptions.tabs.Books,
            badgeText: unreadBookCount > 0 ? '' + unreadBookCount : undefined
          }
        }
      }}
      {...rest}
    />
  )
}
const ReduxNavigationComponent = connect(
  state => ({
    unreadBookCount: state.unreadBooks.length
  }),
  dispatch => {}
)(UnreadBooksNavigationComponent)

/**
 * react-navigation's TabNavigator.
 */
const MyApp = TabNavigator(
  {
    MoviesAndTV: { screen: MoviesAndTV },
    Music: { screen: Music },
    Books: { screen: Books }
  },
  {
    tabBarComponent: ReduxNavigationComponent,
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
          Books: {
            barBackgroundColor: '#5D4037'
          }
        }
      }
    }
  }
)

AppRegistry.registerComponent('MyApp', () => MyApp)
