import { useState } from 'react'
import { cn } from '@/lib/utils'
import Board from './components/Board'
import PreGameControls from './components/PreGameControls'
import { createBoard, randomBoard, SHIPS, isValidBoard } from './lib/board'

function App() {
  const [board, setBoard] = useState(createBoard())

  return (
    <main>
      <div className="h-[100dvh] flex flex-col justify-center items-center gap-10">
        <h1>BattleShip</h1>
        {/* Own Board */}
        <div className="grid grid-cols-2 gap-2">
          <Board board={board} />
          {/* Pre-Game Controls */}
          <PreGameControls board={board} setBoard={setBoard} />
        </div>
      </div>
    </main>
  )
}

export default App
