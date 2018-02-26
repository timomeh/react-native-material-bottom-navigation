import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'

export default class TabList extends React.Component {
  render() {
    const { tabs, activeTab, onTabPress } = this.props

    return (
      <View style={styles.tabs}>
        {React.Children.map(tabs, (tab, i) => {
          return React.cloneElement(tab, {
            isActive: i === activeTab,
            onTabPress: onTabPress(i)
          })
        })}
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
