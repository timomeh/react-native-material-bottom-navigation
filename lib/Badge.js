import React from 'react'
import { View, StyleSheet, Text, ViewPropTypes } from 'react-native'
import PropTypes from 'prop-types'

export default class Badge extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node,
    style: ViewPropTypes.style,
    textStyle: Text.propTypes.style
  }

  render() {
    const { children, style, textStyle } = this.props

    return (
      <View style={[styles.badge, style]}>
        {typeof children === 'string' || typeof children === 'number' ? (
          <Text style={[styles.text, textStyle]}>{children}</Text>
        ) : (
          children
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  badge: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
    height: 18,
    minWidth: 18,
    borderRadius: 10,
    backgroundColor: 'red'
  },
  text: {
    textAlign: 'center',
    fontSize: 10,
    fontWeight: 'bold',
    color: 'white',
    lineHeight: 12
  }
})
