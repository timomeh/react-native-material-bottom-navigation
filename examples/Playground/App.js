import React from 'react'
import { View, StyleSheet } from 'react-native'
import BottomNavigation, {
  ShiftingTab
} from 'react-native-material-bottom-navigation'
import Icon from '@expo/vector-icons/MaterialCommunityIcons'

export default class App extends React.Component {
  state = {
    activeTab: 'games'
  }

  renderTab = ({ tab, isActive }) => (
    <ShiftingTab
      isActive={isActive}
      key={tab.key}
      label={tab.label}
      renderIcon={() => <Icon size={24} color="white" name={tab.icon} />}
    />
  )

  render() {
    return (
      <View style={{ flex: 1 }}>
        <BottomNavigation
          onTabPress={activeTab => this.setState({ activeTab })}
          style={styles.bottomNavigation}
          renderTab={this.renderTab}
          useLayoutAnimation
          tabs={[
            {
              key: 'games',
              label: 'Games',
              barColor: '#388E3C',
              pressColor: 'rgba(255, 255, 255, 0.16)',
              icon: 'gamepad-variant'
            },
            {
              key: 'movies-tv',
              label: 'Movies & TV',
              barColor: '#B71C1C',
              pressColor: 'rgba(255, 255, 255, 0.16)',
              icon: 'movie'
            },
            {
              key: 'music',
              label: 'Music',
              barColor: '#E64A19',
              pressColor: 'rgba(255, 255, 255, 0.16)',
              icon: 'music-note'
            },
            {
              key: 'books',
              label: 'Books',
              barColor: '#1565C0',
              pressColor: 'rgba(255, 255, 255, 0.16)',
              icon: 'book'
            },
            {
              key: 'newsstand',
              label: 'Newsstand',
              barColor: '#6A1B9A',
              pressColor: 'rgba(255, 255, 255, 0.16)',
              icon: 'newspaper'
            }
          ]}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  bottomNavigation: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 56,
    elevation: 8
  }
})
