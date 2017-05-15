import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import BottomNavigation, { Tab } from 'react-native-material-bottom-navigation'
import Icon from 'react-native-vector-icons/MaterialIcons'

/**
 * In this Example, the active Tab will be stored in the state.
 */

export default class StatefulBottomNavigation extends Component {
  constructor(props) {
    super(props)

    this.state = { activeTab: 0 }
    this.handleTabChange = this.handleTabChange.bind(this)
  }

  handleTabChange(newTabIndex, oldTabIndex) {
    this.setState({ activeTab: newTabIndex })
  }

  render() {
    <View style={{ flex: 1 }}>
      <BottomNavigation
        activeTab={this.state.activeTab}
        labelColor="white"
        rippleColor="white"
        style={styles.bottomNavigation}
        onTabChange={this.handleTabChange}
      >
        <Tab
          barBackgroundColor="#37474F"
          label="Movies & TV"
          icon={<Icon size={24} color="white" name="ondemand-video" />}
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
    </View>
  }
}

const styles = StyleSheet.create({
  bottomNavigation: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 56
  }
})
