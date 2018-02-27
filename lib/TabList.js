import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'

export default class TabList extends React.Component {
  render() {
    const { tabs, activeTab, onTabPress, renderTab } = this.props

    return (
      <View style={styles.tabs}>
        {tabs.map((tab, i) =>
          renderTab({
            isActive: tab.key === activeTab,
            onTabPress: onTabPress(tab.key),
            data: tab
          })
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  tabs: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
