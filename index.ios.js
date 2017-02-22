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
import TestThing from './TestThing'

export default class BottomNavigationExperiment extends Component {

  render() {
    return (
      <View style={{ flex: 1 }}>
        <BottomNavigation activeTab={1} style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 56 }}>
          <Tab label="Tab 1" icon={<View style={{ width: 24, height: 24, backgroundColor: 'white', borderRadius: 12 }} />} />
          <Tab label="Tab 2" icon={<View style={{ width: 24, height: 24, backgroundColor: 'white', borderRadius: 12 }} />} />
          <Tab label="Tab 3" icon={<View style={{ width: 24, height: 24, backgroundColor: 'white', borderRadius: 12 }} />} />
          <Tab label="Tab 4" icon={<View style={{ width: 24, height: 24, backgroundColor: 'white', borderRadius: 12 }} />} />
          <Tab label="Tab 5" icon={<View style={{ width: 24, height: 24, backgroundColor: 'white', borderRadius: 12 }} />} />
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
