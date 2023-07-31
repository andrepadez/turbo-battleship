const BOARD_SIZE = 10
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// const squareState = Map({})

const DIRECTIONS = [
  [0, 1],
  [1, 0],
  [-1, 0],
  [0, -1],
]

const ships = [5, 4, 3, 2, 2, 1, 1]
const createBoard = size => new Array(size).fill(null).map(line => new Array(size).fill(0))

const allowPlacing = (board, ship, x, y) => {
  const allowed = []
  for (let direction of DIRECTIONS) {
    const [dx, dy] = direction
    // console.log({ ship, x, y, dx, dy })
    const fx = x + ship * dx
    const fy = y + ship * dy
    if (fx >= board.length || fx < 0 || fy >= board.length || fy < 0) {
      continue
    }

    let valid = true
    for (let i = 0; i < ship; i++) {
      const xIdx = x + i * dx
      const yIdx = y + i * dy
      if (board[xIdx][yIdx] > 0 || board[xIdx][yIdx] === undefined) {
        valid = false
        break
      }
    }
    if (valid) {
      allowed.push(direction)
    }
  }
  return allowed
}

const { floor, ceil, random } = Math

function placeShip(board, ship) {
  const size = board.length
  const startX = ceil(random() * (size - ship))
  const startY = ceil(random() * (size - ship))
  const allowedDirections = allowPlacing(board, ship, startX, startY)
  if (allowedDirections.length === 0) {
    return placeShip(board, ship)
  }
  const [dx, dy] = allowedDirections[floor(random() * allowedDirections.length)]
  const newBoard = structuredClone(board)
  for (let i = 0; i < ship; i++) {
    newBoard[startX + dx * i][startY + dy * i] = ship
  }
  return newBoard
}

const randomBoard = (size = BOARD_SIZE) => {
  let board = createBoard(size)
  for (let ship of ships) {
    board = placeShip(board, ship)
  }

  return board
}

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
                  <div
                    key={idxSquare}
                    className="w-8 h-8 border-[1px] flex items-center justify-center text-white  border-red-500"
                  >
                    {sq || ''}
                  </div>
                ))}
              </div>
            ))}
          </div>
          {/* Pre-Game Controls */}
          <div className="border-2 border-black p-3">
            <div className="grid grid-row-5 h-full">
              <h2 className="text-center">Pre-game controls</h2>
              <div className="grid row-span-3">
                {ships.map((ship, idxShip) => (
                  <div className={cn(`h-5 flex`)} key={idxShip}>
                    {new Array(ship).fill(null).map((sq, idxSq) => (
                      <div key={idxSq} className="bg-black mr-[2px] h-5 w-5"></div>
                    ))}
                  </div>
                ))}
              </div>
              <div className="flex items-end">
                <Button onClick={() => setBoard(randomBoard())}>Random Board</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
