import React, { Component } from 'react'
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
    tabBarLabel: "Movies & TV",
    tabBarIcon: () => <Icon size={24} name="ondemand-video" color="white" />
  }

  render() {
    return <View><Text>Movies & TV</Text></View>
  }
}

/**
 * Screen for second tab.
 * You usually will have this in a separate file.
 */
class Music extends Component {
  static navigationOptions = {
    tabBarLabel: "Music",
    tabBarIcon: () => <Icon size={24} name="music-note" color="white" />
  }

  render() {
    return <View><Text>Music</Text></View>
  }
}

/**
 * Screen for third tab.
 * You usually will have this in a separate file.
 */
class Books extends Component {
  static navigationOptions = {
    tabBarLabel: "Books",
    tabBarIcon: () => <Icon size={24} name="book" color="white" />
  }

  render() {
    return <View><Text>Books</Text></View>
  }
}

/**
 * react-navigation's TabNavigator.
 */
const MyApp = TabNavigator({
  MoviesAndTV: { screen: MoviesAndTV },
  Music: { screen: Music },
  Books: { screen: Books }
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
        Books: {
          barBackgroundColor: '#5D4037'
        }
      }
    }
  }
})

AppRegistry.registerComponent('MyApp', () => MyApp)
