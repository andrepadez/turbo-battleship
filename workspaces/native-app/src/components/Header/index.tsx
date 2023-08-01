import { View, Text } from 'react-native'
import useSocket from 'shared/useSocket'
import { cn } from 'shared/cn'

const Header = () => {
  const { isConnected } = useSocket()

  console.log({ isConnected })
  return (
    <View className="">
      <Text className="w-full mt-3 text-xl font-bold text-center">BattleShip</Text>
      <View
        className={cn(
          'absolute right-5 top-4 w-5 h-5 rounded-full',
          isConnected ? ' bg-green-400' : ' bg-red-400'
        )}
      ></View>
    </View>
  )
}

export default Header
