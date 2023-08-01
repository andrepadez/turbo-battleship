import { useState } from 'react'
import { cn } from '@/lib/utils'
import Board from './components/Board'
import PreGameControls from './components/PreGameControls'
import { createBoard } from 'shared/board'
import useSocket from 'shared/useSocket'

function App() {
  const { isConnected } = useSocket()
  const [ships, setShips] = useState([])

  return (
    <main>
      <div className="h-[100dvh] flex flex-col justify-center items-center gap-10">
        <h1>BattleShip</h1>
        {/* Own Board */}
        <div className="grid grid-cols-2 gap-2">
          <Board ships={ships} />
          {/* Pre-Game Controls */}
          <PreGameControls ships={ships} setShips={setShips} />
        </div>
      </div>
    </main>
  )
}

export default App
