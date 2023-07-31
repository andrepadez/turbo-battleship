import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { createBoard, randomBoard, SHIPS, isValidBoard } from '@/lib/board'
import useSocket from '@/useSocket'

function PreGameControls({ ships, setShips }) {
  const [remainingShips, setRemainingShips] = useState(SHIPS)
  const { isConnected } = useSocket()

  const clearBoard = () => {
    setShips([])
    setRemainingShips(SHIPS)
  }

  const randomizeBoard = () => {
    setShips(randomBoard())
    setRemainingShips([])
  }

  return (
    <div className="border-2 border-black p-3">
      <div className="grid grid-row-5 h-full">
        <h2 className="text-center">Pre-game controls</h2>
        <div className="grid row-span-3 grid-cols-2">
          {remainingShips.map((ship, idxShip) => (
            <div className={cn(`h-5 flex`)} key={idxShip}>
              {new Array(ship).fill(null).map((sq, idxSq) => (
                <div key={idxSq} className="bg-black mr-[2px] h-5 w-5"></div>
              ))}
            </div>
          ))}
        </div>
        <div className="flex items-end justify-between">
          <Button onClick={randomizeBoard}>Random</Button>
          {!remainingShips.length && (
            <>
              <Button onClick={clearBoard}>Clear</Button>
              <Button onClick={() => {}}>Start Game</Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default PreGameControls
