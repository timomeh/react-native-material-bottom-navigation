import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import BottomNavigation, {
  IconTab,
  Badge
} from 'react-native-material-bottom-navigation'
import Icon from '@expo/vector-icons/MaterialCommunityIcons'

export default class App extends React.Component {
  tabs = [
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
      barColor: '#00695C',
      pressColor: 'rgba(255, 255, 255, 0.16)',
      icon: 'movie'
    },
    {
      key: 'music',
      label: 'Music',
      barColor: '#6A1B9A',
      pressColor: 'rgba(255, 255, 255, 0.16)',
      icon: 'music-note'
    },
    {
      key: 'books',
      label: 'Books',
      barColor: '#1565C0',
      pressColor: 'rgba(255, 255, 255, 0.16)',
      icon: 'book'
    }
  ]

  state = {
    activeTab: this.tabs[0].key
  }

  renderIcon = icon => ({ isActive }) => (
    <Icon size={24} color="white" name={icon} />
  )

  renderTab = ({ tab, isActive }) => (
    <IconTab
      isActive={isActive}
      showBadge={tab.key === 'movies-tv'}
      renderBadge={() => <Badge>2</Badge>}
      key={tab.key}
      label={tab.label}
      renderIcon={this.renderIcon(tab.icon)}
    />
  )

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <Image
            source={require('./cut.png')}
            style={{
              resizeMode: 'contain',
              width: 412,
              bottom: -120,
              opacity: 0.5
            }}
          />
        </View>
        <BottomNavigation
          onTabPress={activeTab => this.setState({ activeTab })}
          renderTab={this.renderTab}
          useLayoutAnimation
          tabs={this.tabs}
        />
      </View>
    )
  }
}
