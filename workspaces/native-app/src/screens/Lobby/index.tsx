import { View, Text, Button } from 'react-native'

const LobbyScreen = ({ lobby }) => {
  const { lobbyInfo, createRoom, joinRoom } = lobby
  if (!lobbyInfo) return null
  const { usersOnline, rooms, room, totalRooms, availableRooms } = lobbyInfo
  const roomCount = Object.keys(rooms).length

  return (
    <View className="grid gap-5">
      <View>
        <Text>Users Online: {usersOnline}</Text>
        <Text>Total Rooms: {totalRooms}</Text>
      </View>
      {availableRooms?.length ? (
        <View className="grid gap-2">
          <Text>join an existing Room:</Text>
          {availableRooms.map((room, idx) => (
            <Button
              title={`Room: ${room.id.substring(24)}`}
              key={room.id}
              onPress={() => joinRoom(room.id)}
            />
          ))}
        </View>
      ) : (
        <Button title="Create Room" onPress={createRoom}></Button>
      )}
    </View>
  )
}

export default LobbyScreen
