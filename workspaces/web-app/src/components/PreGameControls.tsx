import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
// import { createBoard, randomBoard, SHIPS, isValidBoard } from 'shared/board'
import useSocket from 'shared/useSocket'

function PreGameControls({ gameSetup }) {
  const { SHIPS, ships, clearBoard, randomizeBoard } = gameSetup
  const [remainingShips, setRemainingShips] = useState(SHIPS)
  const { socket } = useSocket()

  const clear = () => {
    clearBoard()
    setRemainingShips(SHIPS)
  }

  const randomize = () => {
    randomizeBoard()
    setRemainingShips([])
  }

  return (
    <div className="p-3">
      <div className="grid h-full grid-row-5">
        <h2 className="text-center">place your Ships:</h2>
        <div className="grid grid-cols-2 row-span-3">
          {remainingShips.map((ship, idxShip) => (
            <div className={cn(`h-5 flex`)} key={idxShip}>
              {new Array(ship).fill(null).map((sq, idxSq) => (
                <div key={idxSq} className="bg-black mr-[2px] h-5 w-5"></div>
              ))}
            </div>
          ))}
        </div>
        <div className="flex items-end justify-between">
          <Button variant="secondary" onClick={randomize}>
            Random
          </Button>
          {!remainingShips.length && (
            <>
              <Button variant="ghost" onClick={clear}>
                Clear
              </Button>
              <Button onClick={() => {}}>Start Game</Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default PreGameControls
