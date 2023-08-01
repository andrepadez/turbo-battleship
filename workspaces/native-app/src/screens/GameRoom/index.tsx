import { View, Text } from 'react-native'
import useSocket from 'shared/useSocket'
import GameSetup from './GameSetup'

const GameRoomScreen = ({ room }) => {
  const { socket } = useSocket()
  const { player1, player2 } = room
  const playerName = Object.keys(room).find(key => room[key] === socket.id && key)

  return (
    <View className="w-full mt-8 text-center">
      <Text className="text-center">
        Welcome, <Text className="font-bold">{playerName}</Text>
      </Text>
      <Text className="text-center">
        GameRoom <Text className="font-bold">{room.id.substring(24)}</Text>
      </Text>
      {player2 ? (
        <View>
          <Text className="font-bold text-center">...setup your game</Text>
          <GameSetup />
          <View className=""></View>
        </View>
      ) : (
        <View>
          <Text>
            ... waiting for <Text>player2</Text>
          </Text>
        </View>
      )}
    </View>
  )
}

export default GameRoomScreen
