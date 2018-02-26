import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native'

export default class Tab extends React.Component {
  handlePress = ({ nativeEvent }) => {
    const { onTabPress, backgroundColor: color } = this.props
    const x = nativeEvent.pageX
    const y = nativeEvent.locationY

    onTabPress({ x, y, color })
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.handlePress}>
        <View style={styles.tab}>
          <View style={{ width: 24, height: 24 }} />
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center'
  }
})
