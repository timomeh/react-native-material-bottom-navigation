import React from 'react'
import PropTypes from 'prop-types'
import { View, ViewPropTypes, StyleSheet } from 'react-native'

import TabList from './TabList'
import BackgroundDecorator from './BackgroundDecorator'
import PressFeedback from './PressFeedback'

/**
 * The BottomNavigation renders all tabs and takes care of running animations.
 *
 * It uses a [render prop](https://reactjs.org/docs/render-props.html) to
 * render the tabs, so you can easily customize them without clunky
 * configurations.
 *
 * This library includes multiple configurable Tabs which you can use inside
 * the `renderTab` prop. You can also build and use your own tabs.
 *
 * You can use the BottomNavigation as an uncontrolled or a controlled
 * component by using the prop `activeTab`. If you set `activeTab`, the
 * BottomNavigation will switch to controlled mode. If a tab is pressed, it
 * will only become active if you update the value for `activeTab`.
 * You receive tab presses through the prop `onTabPress={(newTab) => ...}`.
 * See also: https://reactjs.org/docs/forms.html#controlled-components
 *
 * If you use it as an uncontrolled component, the tab will automatically
 * become active once it's pressed. `onTabPress` will also be called, so you
 * can change to another screen.
 */
export default class BottomNavigation extends React.Component {
  static propTypes = {
    /** The config of all tabs. Each item will be called in `renderTab`. */
    tabs: PropTypes.arrayOf(
      PropTypes.shape({
        /** A unique identifier for a tab. */
        key: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
          .isRequired,
        /** The background color of the bottom navigation bar. */
        barColor: PropTypes.string,
        /** The color of the touch feedback. */
        pressColor: PropTypes.string
      })
    ).isRequired,
    /** The render prop to render a tab. Arguments: `({ isActive, tab })` */
    renderTab: PropTypes.func.isRequired,
    /**
     * The identifier of the currently active tab. If you set this, the
     * Bottom navigation will become a controlled component.
     */
    activeTab: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /**
     * The called function when a tab was pressed. Useful to change the active
     * tab when you use the Bottom navigation as controlled component.
     * Arguments: `(newTab, oldTab)`
     */
    onTabPress: PropTypes.func,
    /**
     * If `true`, a LayoutAnimation will be triggered when the active tab
     * changes. Necessary to get nice animations when using
     * [ShiftingTab](ShiftingTab.md).
     */
    useLayoutAnimation: PropTypes.bool,
    /** Extends the style of the root view. */
    style: ViewPropTypes.style
  }

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
