import { cn } from '@/lib/utils'
import { BOARD_SIZE } from '@/lib/board'
import { HorizontalRuler, VerticalRuler } from './Rulers'

function Board({ board }) {
  return (
    <div>
      <HorizontalRuler board={board} />
      <div className="flex">
        <VerticalRuler board={board} />
        <div className={cn(`border-2 relative border-black grid  bg-blue-300`, `grid-cols-10`)}>
          {board.map((line, idxLine) => (
            <div key={idxLine} className="">
              {line.map((sq, idxSquare) => (
                <div key={idxSquare} className="w-8 h-8 border-[1px]">
                  <div
                    className={cn(
                      'flex items-center justify-center',
                      sq && 'bg-gray-500 w-full h-full text-white'
                    )}
                  >
                    {sq || ''}
                  </div>
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
