import Board from '@/components/Board'
import PreGameControls from '@/components/PreGameControls'
import { createBoard } from 'shared/board'
import useGameSetup from 'shared/useGameSetup'

const GameSetup = () => {
  const gameSetup = useGameSetup()
  return (
    <div className="grid grid-cols-1 gap-2 mt-5 md:grid-cols-2">
      <PreGameControls gameSetup={gameSetup} />
      <Board gameSetup={gameSetup} />
    </div>
  )
}

export default GameSetup
