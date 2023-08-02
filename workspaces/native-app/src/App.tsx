import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import SafeAreaView from './components/SafeAreaView'
import GameRoomScreen from './screens/GameRoom'
import LobbyScreen from './screens/Lobby'
import Header from './components/Header'
import useLobby from 'shared/useLobby'

export default function App() {
  const lobby = useLobby()
  const { lobbyInfo } = lobby
  if (!lobbyInfo) return null
  const { room } = lobbyInfo

  return (
    <SafeAreaView className="flex-1">
      <Header />
      <View className="items-center justify-center flex-1 bg-white">
        {room ? <GameRoomScreen room={room} /> : <LobbyScreen lobby={lobby} />}
      </View>
    </SafeAreaView>
  )
}
