/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import BottomNavigation from './lib/BottomNavigation'
import Tab from './lib/Tab'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import MIcon from 'react-native-vector-icons/MaterialIcons'

export default class BottomNavigationExperiment extends Component {

  render() {
    return (
      <View style={{ flex: 1 }}>
        <BottomNavigation activeTab={0} style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 56 }}>
          <Tab barColor="#37474F" label="Movies & TV" icon={<MIcon size={24} color="white" name="ondemand-video" />} />
          <Tab barColor="#00796B" label="Music" icon={<Icon size={24} color="white" name="music-note" />} />
          <Tab barColor="#5D4037" label="Books" icon={<Icon size={24} color="white" name="book" />} />
          <Tab barColor="#3E2723" label="Newsstand" icon={<Icon size={24} color="white" name="newspaper" />} />
        </BottomNavigation>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

AppRegistry.registerComponent('BottomNavigation', () => BottomNavigationExperiment);
