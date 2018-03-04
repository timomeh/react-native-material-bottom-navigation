import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native'

export default class TabList extends React.Component {
  constructor(props) {
    super(props)
    this.isControlled = props.activeTab != null

    this.state = {
      activeTab: this.isControlled ? undefined : props.tabs[0].key
    }
  }

  componentWillMount() {
    this.props.setBackgroundColor(this.getActiveTab().tintColor)
  }

  getActiveTab = () => {
    const activeKey = this.isControlled
      ? this.props.activeTab
      : this.state.activeTab
    return this.props.tabs.find(tab => tab.key === activeKey)
  }

  handleTabPress = tab => event => {
    const { pageX: x, locationY: y } = event.nativeEvent
    this.props.addDecorator({ x, y, tintColor: tab.tintColor })

    if (!this.isControlled) {
      this.setState({ activeTab: tab.key })
    }
  }

  handleTabPressIn = tab => event => {
    // TODO
  }

  handleTabPressOut = tab => event => {
    // TODO
  }

  render() {
    const { tabs, renderTab } = this.props

    return (
      <View style={styles.tabs}>
        {tabs.map((tab, i) => (
          <TouchableWithoutFeedback
            key={tab.key}
            onPress={this.handleTabPress(tab)}
          >
            {renderTab({
              isActive: tab.key === this.getActiveTab().key,
              data: tab
            })}
          </TouchableWithoutFeedback>
        ))}
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
