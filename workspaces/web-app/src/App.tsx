const BOARD_SIZE = 10
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// const squareState = Map({})

const createBoard = size => new Array(size).fill(null).map(line => new Array(size).fill(0))

const ships = [5, 4, 3, 2, 2, 1, 1]

function App() {
  const [board, setBoard] = useState(createBoard(BOARD_SIZE))
  console.log(board)
  return (
    <main>
      <div className="h-[100dvh] flex flex-col justify-center items-center gap-10">
        <h1>BattleShip</h1>

        {/* Own Board */}
        <div className="grid grid-cols-2 gap-2">
          <div className={cn(`border-2 border-black grid grid-cols-${BOARD_SIZE} bg-blue-300`)}>
            {board.map((line, idxLine) => (
              <div key={idxLine} className="">
                {line.map((sq, idxSquare) => (
                  <div key={idxSquare} className="w-8 h-8 border-[1px] border-red-500"></div>
                ))}
              </div>
            ))}
          </div>
          {/* Pre-Game Controls */}
          <div className="border-2 border-black p-3">
            <div className="grid grid-row-3 h-full">
              <h2 className="text-center">Pre-game controls</h2>
              <div className="grid">
                {ships.map((ship, idxShip) => (
                  <div className={cn(`h-5 flex`)} key={idxShip}>
                    {new Array(ship).fill(null).map((sq, idxSq) => (
                      <div className="bg-black mr-[1px] h-5 w-5"></div>
                    ))}
                  </div>
                ))}
              </div>
              <div className="flex items-end">
                <Button>Random Board</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
