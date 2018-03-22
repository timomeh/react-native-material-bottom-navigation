import { Dimensions, Platform } from 'react-native'

const X_WIDTH = 375
const X_HEIGHT = 812

export const isIPhoneX = () => {
  if (Platform.OS === 'web' || Platform.OS === 'android') return false

  const { width, height } = Dimensions.get('window')
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    ((height === X_HEIGHT && width === X_WIDTH) ||
      (height === X_WIDTH && width === X_HEIGHT))
  )
}

export default {
  select({ iPhoneX }) {
    if (isIPhoneX()) return iPhoneX
    return {}
  },
  isIPhoneX
}
