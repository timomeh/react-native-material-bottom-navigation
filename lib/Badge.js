/**
 * Material badge for showing notifications, maybe more functionality in the future
 * @flow
 */

import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

type BProps = {
  text: string,
  size: number,
  children: Array<ReactElement<*>>,
  style: any,
  isVisible: boolean,
}

const defaultProps = {
  size: 20,
  isVisible: true,
  style: {},
}

export default class Badge extends Component {
  static defaultProps: typeof defaultProps
  props: BProps
  static defaultProps = defaultProps

  createStyles() {
    const { size, style } = this.props;
    const container = Object.assign(
      {},
      {
        position: "absolute",
        width: size,
        height: size,
        borderRadius: size / 2,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F50057",
        zIndex: 9999,
        bottom: 10,
      },
      style.container
    );

    const text = Object.assign(
      {},
      {
        color: "#fff",
        fontWeight: "500",
        fontSize: 12,
      },
      style.text
    )

    return StyleSheet.create({
      container,
      text,
    })
  }

  render() {
    const { children, text, isVisible } = this.props;
    const styles = this.createStyles();
    if (!isVisible) {
      return null;
    }

    return (
      <View>
        <View style={styles.container}>
          <Text style={styles.text}>{text}</Text>
        </View>
      </View>
    )
  }
}
