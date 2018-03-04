import React from 'react'
import PropTypes from 'prop-types'
import { View, ViewPropTypes, StyleSheet } from 'react-native'

import TabList from './TabList'
import BackgroundDecorator from './BackgroundDecorator'
import PressFeedback from './PressFeedback'

const BottomNavigation = props => {
  return (
    <View style={[styles.bar, props.style]}>
      <BackgroundDecorator>
        {(addDecorator, setBackgroundColor) => (
          <PressFeedback>
            {(addFeedbackIn, enqueueFeedbackOut) => (
              <TabList
                tabs={props.tabs}
                activeTab={props.activeTab}
                onTabPress={props.onTabPress}
                renderTab={props.renderTab}
                setBackgroundColor={setBackgroundColor}
                addDecorator={addDecorator}
                addFeedbackIn={addFeedbackIn}
                enqueueFeedbackOut={enqueueFeedbackOut}
              />
            )}
          </PressFeedback>
        )}
      </BackgroundDecorator>
    </View>
  )
}

BottomNavigation.propTypes = {
  tabs: PropTypes.array.isRequired,
  activeTab: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onTabPress: PropTypes.func,
  renderTab: PropTypes.func.isRequired
}

export default BottomNavigation

const styles = StyleSheet.create({
  bar: {
    overflow: 'hidden'
  }
})
