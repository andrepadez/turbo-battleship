import { SafeAreaView as RNSafeAreaView } from 'react-native'
import * as Device from 'expo-device'
import { cn } from 'shared/cn'

const SafeAreaView = ({ children, className, ...props }) => {
  return (
    <RNSafeAreaView {...props} className={cn(className, 'android:pt-4')}>
      {children}
    </RNSafeAreaView>
  )
}

export default SafeAreaView
