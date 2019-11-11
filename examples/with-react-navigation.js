import React, { useCallback } from 'react'
import { View, Text } from 'react-native'
import { createNavigator, TabRouter } from 'react-navigation'
import BottomNavigation, {
  FullTab
} from 'react-native-material-bottom-navigation'
import Icon from '@expo/vector-icons/MaterialCommunityIcons'

// Screens. Normally you would put these in separate files.
const Movies = () => (
  <View>
    <Text>Movies</Text>
  </View>
)
const Music = () => (
  <View>
    <Text>Music</Text>
  </View>
)
const Books = () => (
  <View>
    <Text>Books</Text>
  </View>
)

function AppTabView(props) {
  const tabs = [
    { key: 'Movies', label: 'Movies', barColor: '#00695C', icon: 'movie' },
    { key: 'Music', label: 'Music', barColor: '#6A1B9A', icon: 'music-note' },
    { key: 'Books', label: 'Books', barColor: '#1565C0', icon: 'book' }
  ]

  const { navigation, descriptors } = props
  const { routes, index } = navigation.state
  const activeScreenName = routes[index].key
  const descriptor = descriptors[activeScreenName]
  const ActiveScreen = descriptor.getComponent()

  const handleTabPress = useCallback(
    newTab => navigation.navigate(newTab.key),
    [navigation]
  )

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <ActiveScreen navigation={descriptor.navigation} />
      </View>

      <BottomNavigation
        tabs={tabs}
        activeTab={activeScreenName}
        onTabPress={handleTabPress}
        renderTab={({ tab, isActive }) => (
          <FullTab
            isActive={isActive}
            key={tab.key}
            label={tab.label}
            renderIcon={() => <Icon name={tab.icon} size={24} color="white" />}
          />
        )}
      />
    </View>
  )
}

const AppTabRouter = TabRouter({
  Movies: { screen: Movies },
  Music: { screen: Music },
  Books: { screen: Books }
})

const AppNavigator = createNavigator(AppTabView, AppTabRouter, {})

export default AppNavigator
