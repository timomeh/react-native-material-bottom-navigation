import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  ViewPropTypes,
  StyleSheet,
  Platform,
  Dimensions
} from 'react-native'

import Device from './utils/device'
import TabList from './TabList'
import BackgroundDecorator from './BackgroundDecorator'
import PressFeedback from './PressFeedback'

export const BAR_HEIGHT_ANDROID = 56
export const BAR_HEIGHT_IOS = 49

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
 * `newTab` is the tab object, you can get its key with `newTab.key`.
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
        pressColor: PropTypes.string,
        /** The diameter of the expanded touch feedback. */
        pressSize: PropTypes.number
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
     * tab when you use the Bottom navigation as controlled component. Has
     * the tab object of the pressed tab and the currently active tab as
     * as parameters.
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
    style: ViewPropTypes.style,
    /**
     * (experimental, android only) If you pass the height of the viewport, it
     * will check if android soft navigation is enabled and configure the
     * BottomNavigation so it looks nice behind the navigation bar.
     */
    viewportHeight: PropTypes.number
  }

  constructor(props) {
    super(props)

    this.state = {
      isLandscape: Device.isLandscape(),
      hasSoftKeysAndroid: Device.hasSoftKeysAndroid(props.viewportHeight)
    }
  }

  componentDidMount() {
    Dimensions.addEventListener('change', this.handleDimensionChange)
  }

  componentWillReceiveProps(nextProps) {
    if (Platform.OS !== 'android') return

    if (nextProps.viewportHeight !== this.props.viewportHeight) {
      this.setState({
        hasSoftKeysAndroid: Device.hasSoftKeysAndroid(nextProps.viewportHeight)
      })
    }
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.handleDimensionChange)
  }

  handleDimensionChange = () => {
    if (Device.isLandscape() && !this.state.isLandscape) {
      this.setState({ isLandscape: true })
    } else if (Device.isPortrait() && this.state.isLandscape) {
      this.setState({ isLandscape: false })
    }
  }

  render() {
    const { isLandscape, hasSoftKeysAndroid } = this.state
    const { style, ...tabProps } = this.props
    const extraStyle = [
      isLandscape ? orientationStyle.portrait : orientationStyle.landscape,
      hasSoftKeysAndroid ? androidStyle.softKeyBar : null
    ]

    return (
      <View style={[styles.bar, ...extraStyle, style]}>
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

const androidStyle = StyleSheet.create({
  softKeyBar: {
    height: BAR_HEIGHT_ANDROID + Device.ANDROID_SOFTKEY_HEIGHT,
    paddingBottom: Device.ANDROID_SOFTKEY_HEIGHT
  }
})

const orientationStyle = StyleSheet.create({
  landscape: {
    ...Device.select({
      iPhoneX: {
        height: BAR_HEIGHT_IOS + Device.IPHONE_X_BOTTOM_LANDSCAPE,
        paddingBottom: Device.IPHONE_X_BOTTOM_LANDSCAPE
      }
    })
  },
  portrait: {
    ...Device.select({
      iPhoneX: {
        height: BAR_HEIGHT_IOS + Device.IPHONE_X_BOTTOM_PORTRAIT,
        paddingBottom: Device.IPHONE_X_BOTTOM_PORTRAIT
      }
    })
  }
})

const styles = StyleSheet.create({
  bar: {
    backgroundColor: 'white',
    ...Platform.select({
      ios: {
        height: BAR_HEIGHT_IOS,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        height: BAR_HEIGHT_ANDROID,
        elevation: 8
      }
    })
  }
})
