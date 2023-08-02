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

  return (
    <SafeAreaView className="flex-1">
      <Header />
      <View className="items-center justify-center flex-1 bg-white">
        {lobbyInfo?.room ? <GameRoomScreen room={lobbyInfo.room} /> : <LobbyScreen lobby={lobby} />}
      </View>
    </SafeAreaView>
  )
}
