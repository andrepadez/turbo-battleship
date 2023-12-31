import { cn } from 'shared/cn'
import { BOARD_SIZE, createBoard } from 'shared/board'
import { HorizontalRuler, VerticalRuler } from './Rulers'
import Ships from './Ships'

function Board({ gameSetup }) {
  const { ships } = gameSetup
  const board = createBoard()
  return (
    <div>
      <HorizontalRuler board={board} />
      <div className="flex">
        <VerticalRuler board={board} />
        <div className={cn(`border-2 relative border-black  bg-blue-300`)}>
          <Ships ships={ships} />
          {board.map((line, idxLine) => (
            <div key={idxLine} className="grid grid-cols-10">
              {line.map((sq, idxSquare) => (
                <div key={idxSquare} className={`w-8 h-8 border-[1px]`}></div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Board
