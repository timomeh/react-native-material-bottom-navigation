// @flow

declare module 'react-native-material-bottom-navigation' {
  // A few type definitions.
  // This is adoped from react-navigation/flow/react-navigation.js
  declare type StyleObj =
    | null
    | void
    | number
    | false
    | ''
    | $ReadOnlyArray<StyleObj>
    | { [name: string]: any }
  declare type ViewStyleProp = StyleObj
  declare type TextStyleProp = StyleObj
  declare type AnimatedViewStyleProp = StyleObj
  declare type AnimatedTextStyleProp = StyleObj
  declare type AnimatedValue = Object
  declare type EasingFunction = (t: number) => number
  declare type AnimationDefinition = (
    progress: AnimatedValue
  ) => AnimatedViewStyleProp

  declare export type TabConfig = {
    key: number | string,
    barColor?: string,
    pressColor?: string
  }

  declare export type BottomNavigationProps = {
    tabs: Array<TabConfig>,
    renderTab: ({ isActive: boolean }) => React$Element<*>,
    activeTab?: number | string,
    onTabPress?: (newTab: TabConfig, oldTab: TabConfig) => void,
    useLayoutAnimation?: boolean,
    style?: ViewStyleProp,
    viewport?: number
  }

  declare export type IconTabProps = {
    isActive: boolean,
    style?: ViewStyleProp,
    renderIcon: ({ isActive: boolean }) => React$Element<*>,
    renderBadge?: ({ isActive: boolean }) => React$Element<*>,
    showBadge?: boolean,
    badgeSlotStyle?: ViewStyleProp,
    animationDuration?: number,
    animationEasing?: EasingFunction,
    iconAnimation?: AnimationDefinition,
    badgeAnimation?: AnimationDefinition
  }

  declare export type FullTabProps = {
    isActive: boolean,
    style?: ViewStyleProp,
    renderIcon: ({ isActive: boolean }) => React$Element<*>,
    renderBadge?: ({ isActive: boolean }) => React$Element<*>,
    showBadge?: boolean,
    badgeSlotStyle?: ViewStyleProp,
    label: string,
    labelStyle?: TextStyleProp,
    animationDuration?: number,
    animationEasing?: EasingFunction,
    iconAnimation?: AnimationDefinition,
    labelAnimation?: AnimationDefinition,
    badgeAnimation?: AnimationDefinition
  }

  declare export type BadgeProps = {
    children?: React$Node,
    style?: ViewStyleProp,
    textStyle: TextStyleProp
  }

  declare export default React$ComponentType<BottomNavigationProps>
  declare export var IconTab: React$ComponentType<IconTabProps>
  declare export var FullTab: React$ComponentType<FullTabProps>
  declare export var ShiftingTab: React$ComponentType<FullTabProps>
  declare export var Badge: React$ComponentType<BadgeProps>
}
