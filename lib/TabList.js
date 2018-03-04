import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native'

export default class TabList extends React.Component {
  constructor(props) {
    super(props)

    this.isControlled = props.activeTab != null

    // # this.nextDecorator
    // When the user presses a Tab, the Decorator data is stored in here and
    // retrieved when the Tab visually becomes active.
    // We need to temporarily store it for the controlled component because we
    // can't pass the data between the onPress-callbacks without it being too
    // much of an hassle for the developer.
    this.nextDecorator = null

    this.state = {
      activeTab: this.isControlled ? undefined : props.tabs[0].key
    }
  }

  componentWillMount() {
    this.props.setBackgroundColor(this.getActiveTab().tintColor)
  }

  componentWillReceiveProps(nextProps) {
    if (this.isControlled && nextProps.activeTab !== this.props.activeTab) {
      this.runDecorator(nextProps.activeTab)
    }
  }

  getActiveTab = () => {
    const activeKey = this.isControlled
      ? this.props.activeTab
      : this.state.activeTab
    return this.props.tabs.find(tab => tab.key === activeKey)
  }

  /**
   * Sends the Decorator data to the BackgroundDecorator Component.
   */
  runDecorator = newTabKey => {
    // `nextDecorator` could be null if the Tab was changed without a user
    // interaction. In this case we just update the backgroundColor.
    if (!this.nextDecorator) {
      const { tintColor } = this.props.tabs.find(tab => tab.key === newTabKey)
      this.props.setBackgroundColor(tintColor)
      return
    }

    // Cloning the decorator data prevents muted data while the Animation is
    // being rendered. In theory this could happen, but tbh I don't know if
    // it can happen in practice. Just to be safe...
    const decorator = { ...this.nextDecorator }
    this.nextDecorator = null
    this.props.addDecorator(decorator)
  }

  /**
   * Called when a Tab is pressed.
   */
  handleTabPress = tab => event => {
    const { pageX: x, locationY: y } = event.nativeEvent
    this.nextDecorator = { x, y, tintColor: tab.tintColor }
    this.props.onTabPress(tab.key, this.getActiveTab().key)

    if (!this.isControlled) {
      this.setState({ activeTab: tab.key })
      this.runDecorator(tab.key)
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
