import { cn } from '@/lib/utils'
import { BOARD_SIZE, createBoard } from 'shared/board'
import { HorizontalRuler, VerticalRuler } from './Rulers'
import Ships from './Ships'

function Board({ ships }) {
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
                <div key={idxSquare} className={`w-8 h-8 border-[1px]`}>
                  {/* <div
                    className={cn(
                      'flex items-center justify-center',
                      sq && 'bg-gray-500 w-full h-full text-white'
                    )}
                  >
                    {sq || ''}
                  </div> */}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Board

const ships = [
  {
    length: 5,
    positions: [
      [3, 5],
      [4, 5],
      [5, 5],
      [6, 5],
      [7, 5],
    ],
    direction: 'horizontal',
  },
  {
    length: 4,
    positions: [
      [1, 2],
      [1, 3],
      [1, 4],
      [1, 5],
    ],
    direction: 'horizontal',
  },
  {
    length: 3,
    positions: [
      [4, 3],
      [5, 3],
      [6, 3],
    ],
    direction: 'vertical',
  },
  {
    length: 2,
    positions: [
      [2, 6],
      [3, 6],
    ],
    direction: 'horizontal',
  },
  {
    length: 2,
    positions: [
      [4, 6],
      [5, 6],
    ],
    direction: 'horizontal',
  },
  {
    length: 1,
    positions: [[8, 5]],
    direction: 'horizontal',
  },
  {
    length: 1,
    positions: [[3, 8]],
    direction: 'vertical',
  },
]
