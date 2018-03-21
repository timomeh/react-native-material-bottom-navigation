import React from 'react'
import PropTypes from 'prop-types'
import { View, ViewPropTypes, StyleSheet } from 'react-native'

import TabList from './TabList'
import BackgroundDecorator from './BackgroundDecorator'
import PressFeedback from './PressFeedback'

export default class BottomNavigation extends React.Component {
  render() {
    const { style, ...tabProps } = this.props

    return (
      <View style={[styles.bar, style]}>
        <BackgroundDecorator>
          {(addDecorator, setBackgroundColor) => (
            <PressFeedback>
              {(addFeedbackIn, enqueueFeedbackOut) => (
                <TabList
                  setBackgroundColor={setBackgroundColor}
                  addDecorator={addDecorator}
                  addFeedbackIn={addFeedbackIn}
                  enqueueFeedbackOut={enqueueFeedbackOut}
                  {...tabProps}
                />
              )}
            </PressFeedback>
          )}
        </BackgroundDecorator>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  bar: {
    overflow: 'hidden'
  }
})
