import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'

export default class TabList extends React.Component {
  static propTypes = {
    renderTab: PropTypes.func.isRequired,
    onTabPress: PropTypes.func.isRequired,
    tabs: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
          .isRequired
      })
    ),
    activeTab: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired
  }

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
    alignItems: 'stretch'
  }
})
