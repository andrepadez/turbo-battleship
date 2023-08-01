import { useState } from 'react'
import { cn } from '@/lib/utils'
import Header from '@/components/Header'
import LobbyScreen from '@/screens/Lobby'

import Board from './components/Board'
import PreGameControls from './components/PreGameControls'
import { createBoard } from 'shared/board'
import useSocket from 'shared/useSocket'
import useLobby from './useLobby'

function App() {
  const { isConnected, socket } = useSocket()
  const lobby = useLobby()
  const { lobbyInfo } = lobby
  if (!lobbyInfo) return null

  const { room } = lobbyInfo

  return (
    <main className="flex flex-col h-[100dvh] w-[100dvw]">
      <Header />
      <div className="flex flex-col items-center justify-center flex-1 gap-10">
        {room ? <div>room: {room.id}</div> : <LobbyScreen lobby={lobby} />}
      </div>
    </main>
  )
}

export default App

{
  /* <div className="grid grid-cols-2 gap-2">
<Board ships={ships} />
<PreGameControls ships={ships} setShips={setShips} />
</div> */
}
