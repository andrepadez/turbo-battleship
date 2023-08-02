import { View, Text } from 'react-native'
const squareSize = 32

const Ships = ({ ships }) => {
  return (
    <View className="absolute w-full h-full z-1000">
      <View className="relative w-full h-full">
        {ships
          // .filter(ship => ship.length === 1)
          .map((ship, idx) => {
            const { length, positions, direction } = ship
            const [[startX, startY]] = positions
            const style = {
              marginLeft: squareSize * startX,
              marginTop: squareSize * startY,
              width: direction === 'horizontal' ? squareSize * length : squareSize,
              height: direction === 'horizontal' ? squareSize : squareSize * length,
            }
            return (
              <View key={idx}>
                <View
                  key={idx}
                  className="absolute bg-gray-500 border-2 border-gray-200"
                  style={style}
                >
                  <View className="flex items-center justify-center h-full">
                    <Text className="font-bold text-white">{ship.length}</Text>
                  </View>
                </View>
              </View>
            )
          })}
      </View>
    </View>
  )
}

export default Ships
