import { ViewStyle, TextStyle, StyleProp, Animated } from 'react-native'

declare module 'react-native-material-bottom-navigation' {
  export interface TabConfig {
    key: number | string
    barColor?: string
    pressColor?: string
  }

  export type AnimationDefinition = (progress: Animated.Value) => any
  export type EasingFunction = (t: number) => number

  export interface BottomNavigationProps {
    tabs: { [index: number]: TabConfig }
    renderTab: ({ isActive: boolean }) => JSX.Element
    activeTab?: number | string
    onTabPress?: (newTab: TabConfig, oldTab: TabConfig) => void
    useLayoutAnimation?: boolean
    style?: StyleProp<ViewStyle>
    viewportHeight?: number
  }

  export interface IconTabProps {
    isActive: boolean
    style?: StyleProp<ViewStyle>
    renderIcon: ({ isActive: boolean }) => JSX.Element
    renderBadge?: ({ isActive: boolean }) => JSX.Element
    showBadge?: boolean
    badgeSlotStyle?: StyleProp<ViewStyle>
    animationDuration?: number
    animationEasing?: EasingFunction
    iconAnimation?: AnimationDefinition
    badgeAnimation?: AnimationDefinition
  }

  export interface FullTabProps {
    isActive: boolean
    style?: StyleProp<ViewStyle>
    renderIcon: ({ isActive: boolean }) => JSX.Element
    renderBadge?: ({ isActive: boolean }) => JSX.Element
    showBadge?: boolean
    badgeSlotStyle?: StyleProp<ViewStyle>
    label: string
    labelStyle?: StyleProp<TextStyle>
    animationDuration?: number
    animationEasing?: EasingFunction
    iconAnimation?: AnimationDefinition
    labelAnimation?: AnimationDefinition
    badgeAnimation?: AnimationDefinition
  }

  export interface BadgeProps {
    children?: JSX.Element | string | number
    style?: StyleProp<ViewStyle>
    textStyle?: StyleProp<TextStyle>
  }

  export default class BottomNavigation extends React.Component<
    BottomNavigationProps
  > {}
  export class IconTab extends React.Component<IconTabProps> {}
  export class FullTab extends React.Component<FullTabProps> {}
  export class ShiftingTab extends React.Component<FullTabProps> {}
  export class Badge extends React.Component<BadgeProps> {}
}
