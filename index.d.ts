import { ViewStyle, TextStyle } from 'react-native'
declare module 'react-native-material-bottom-navigation' {
  export interface BottomNavigationProps {
    activeTab?: number
    labelColor?: string
    activeLabelColor?: string
    rippleColor?: string
    backgroundColor?: string
    onTabChange?: (newTabIndex: number, oldTabIndex: number) => void
    style?: ViewStyle
    innerStyle?: ViewStyle
    shifting?: boolean
  }

  export interface TabProps {
    icon?: JSX.Element
    activeIcon?: JSX.Element
    label?: JSX.Element | string
    labelColor?: string
    activeLabelColor?: string
    barBackgroundColor?: string
    onPress?: (newTabIndex?: number) => void
    badgeText?: JSX.Element | string
    badgeSize?: number
    badgeStyle?: {
      container?: ViewStyle
      text?: TextStyle
    }
    isBadgeVisible?: boolean
  }

  export class BottomNavigation extends React.Component<
    BottomNavigationProps
  > {}
  export class Tab extends React.Component<TabProps> {}
  export default BottomNavigation
}
