import { Dimensions, Platform } from 'react-native'

const IPHONE_X_WIDTH = 375
const IPHONE_X_HEIGHT = 812
const IPHONE_XR_XSMAX_WIDTH = 414
const IPHONE_XR_XSMAX_HEIGHT = 896
const IPHONE_X_BOTTOM_PORTRAIT = 34
const IPHONE_X_BOTTOM_LANDSCAPE = 24
export const ANDROID_SOFTKEY_HEIGHT = 48
export const LANDSCAPE = 'LANDSCAPE'
export const PORTRAIT = 'PORTRAIT'

export const isIPhoneX = () => {
  if (Platform.OS === 'web' || Platform.OS === 'android') return false

  const { width, height } = Dimensions.get('window')
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    ((height === IPHONE_X_HEIGHT && width === IPHONE_X_WIDTH) ||
      (height === IPHONE_X_WIDTH && width === IPHONE_X_HEIGHT) ||
      (height === IPHONE_XR_XSMAX_HEIGHT && width === IPHONE_XR_XSMAX_WIDTH) ||
      (height === IPHONE_XR_XSMAX_WIDTH && width === IPHONE_XR_XSMAX_HEIGHT))
  )
}

export const getOrientation = () => {
  const { width, height } = Dimensions.get('screen')
  return width > height ? LANDSCAPE : PORTRAIT
}

export const isLandscape = () => {
  return getOrientation() === LANDSCAPE
}

export const isPortrait = () => {
  return getOrientation() === PORTRAIT
}

export const hasSoftKeysAndroid = viewportHeight => {
  if (Platform.OS === 'android' && isPortrait()) {
    const { height: screenHeight } = Dimensions.get('screen')
    return screenHeight === viewportHeight
  }

  return false
}

export default {
  select({ iPhoneX, androidSoftKeys }) {
    return {
      ...(isIPhoneX() ? iPhoneX : {})
    }
  },
  isIPhoneX,
  hasSoftKeysAndroid,
  getOrientation,
  isLandscape,
  isPortrait,
  ANDROID_SOFTKEY_HEIGHT,
  IPHONE_X_BOTTOM_LANDSCAPE,
  IPHONE_X_BOTTOM_PORTRAIT
}
