import React from 'react'
import { View, StyleSheet, Text, ViewPropTypes } from 'react-native'
import PropTypes from 'prop-types'

/**
 * A Badge which can be rendered on top of a Tab.
 */
export default class Badge extends React.Component {
  static propTypes = {
    /** Content of the Badge. String and Number will be wrapped in a `Text`. */
    children: PropTypes.node,
    /** Extends the style of the badge's view. */
    style: ViewPropTypes.style,
    /** Extends the style of wrapped `Text` component. */
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
