import { useState } from 'react'
import Header from '@/components/Header'
import LobbyScreen from '@/screens/Lobby'
import GameRoomScreen from '@/screens/GameRoom'
import useLobby from 'shared/useLobby'

function App() {
  const lobby = useLobby()
  const { lobbyInfo } = lobby
  if (!lobbyInfo) return null

  const { room } = lobbyInfo

  return (
    <main className="flex flex-col h-[100dvh] w-[100dvw]">
      <Header />
      <div className="flex flex-col items-center justify-center flex-1 gap-10">
        {room ? <GameRoomScreen room={room} /> : <LobbyScreen lobby={lobby} />}
      </div>
    </main>
  )
}

export default App
