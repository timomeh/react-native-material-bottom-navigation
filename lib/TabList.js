import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  LayoutAnimation,
  Platform,
  UIManager
} from 'react-native'

const SHIFTING_DURATION = 250
const SHIFTING_EASING = LayoutAnimation.Types.easeInEaseOut
const LAYOUT_ANIMATION_CONFIG = LayoutAnimation.create(
  SHIFTING_DURATION,
  SHIFTING_EASING,
  LayoutAnimation.Properties.opacity
)

export default class TabList extends React.Component {
  static propTypes = {
    tabs: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
          .isRequired,
        tintColor: PropTypes.string,
        rippleColor: PropTypes.stirng
      })
    ).isRequired,
    activeTab: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onTabPress: PropTypes.func,
    setBackgroundColor: PropTypes.func.isRequired,
    addDecorator: PropTypes.func.isRequired,
    addFeedbackIn: PropTypes.func.isRequired,
    enqueueFeedbackOut: PropTypes.func.isRequired,
    useLayoutAnimation: PropTypes.bool
  }

  static defaultProps = {
    onTabPress: (newTabKey, oldTabKey) => {},

    // Using LayoutAnimation is an opt-in, because it could potentially cause
    // unintentional glitches in the App's UI. If it's enabled, the developer
    // should be aware of that.
    useLayoutAnimation: false
  }

  constructor(props) {
    super(props)

    // When the user presses a Tab, the Decorator data is stored in here and
    // retrieved when the Tab visually becomes active.
    // We need to temporarily store it for the controlled component because we
    // can't pass the data between the onPress-callbacks without it being too
    // much of an hassle for the developer.
    this.nextDecorator = null

    this.isControlled = props.activeTab != null

    this.state = {
      activeTab: this.isControlled ? props.activeTab : props.tabs[0].key
    }
  }

  componentWillMount() {
    // Initially set background color
    this.props.setBackgroundColor(this.getActiveTab().tintColor)

    if (this.props.useLayoutAnimation && Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.isControlled && nextProps.activeTab !== this.props.activeTab) {
      this.setActiveTab(nextProps.activeTab)
      this.runDecorator(nextProps.activeTab)
    }
  }

  getActiveTab = () => {
    return this.props.tabs.find(tab => tab.key === this.state.activeTab)
  }

  setActiveTab = activeTab => {
    if (this.props.useLayoutAnimation) {
      // Delay activeTab update to next frame, so LayoutAnimation won't screw
      // up other changes on the screen.
      requestAnimationFrame(() => {
        LayoutAnimation.configureNext(LAYOUT_ANIMATION_CONFIG)
        this.setState({ activeTab })
      })
    } else {
      this.setState({ activeTab })
    }
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

    // Cloning the decorator data prevents mutated data while the Animation is
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
      this.setActiveTab(tab.key)
      this.runDecorator(tab.key)
    }
  }

  /**
   * Called at the start of a Tab press.
   * Show press feedback.
   */
  handleTabPressIn = tab => event => {
    const { pageX: x, locationY: y } = event.nativeEvent
    this.tabPressKey = Date.now()
    this.props.addFeedbackIn({
      x,
      y,
      key: this.tabPressKey,
      color: tab.rippleColor
    })
  }

  /**
   * Called at the end of a Tab press.
   * Hide press feedback.
   */
  handleTabPressOut = tab => event => {
    const { pageX: x, locationY: y } = event.nativeEvent
    this.props.enqueueFeedbackOut(this.tabPressKey)
    this.tabPressKey = null
  }

  render() {
    const { tabs, renderTab } = this.props

    return (
      <View style={styles.tabs}>
        {tabs.map((tab, i) => (
          <TouchableWithoutFeedback
            key={tab.key}
            onPress={this.handleTabPress(tab)}
            onPressIn={this.handleTabPressIn(tab)}
            onPressOut={this.handleTabPressOut(tab)}
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
