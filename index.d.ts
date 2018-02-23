import { ViewStyle } from 'react-native';
declare module 'react-native-material-bottom-navigation' {
    export interface BottomNavigationProps {
        activeTab?: number;
        labelColor?: string;
        activeLabelColor?: string;
        rippleColor?: string;
        backgroundColor?: string;
        onTabChange?: (newTabIndex: number, oldTabIndex: number) => void;
        style?: ViewStyle;
        innerStyle?: ViewStyle;
        shifting?: boolean;
    }

    export interface TabProps {
        icon?: JSX.Element;
        activeIcon?: JSX.Element;
        label?: JSX.Element;
        labelColor?: string;
        activeLabelColor?: string;
        barBackgroundColor?: string;
        onPress: (newTabIndex?: number) => void;
        badgeText?: string;
        badgeSize?: number;
        badgeStyle?: ViewStyle;
        isBadgeVisible?: boolean;
    }

    export class BottomNavigation extends React.Component<BottomNavigationProps> { }
    export class Tab extends React.Component<TabProps> { }
}