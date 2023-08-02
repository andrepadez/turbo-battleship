import { useState } from 'react'

const usePregame = gameSetup => {
  const { SHIPS, ships, clearBoard, randomizeBoard } = gameSetup
  const [remainingShips, setRemainingShips] = useState(SHIPS)

  const clear = () => {
    clearBoard()
    setRemainingShips(SHIPS)
  }

  const randomize = () => {
    randomizeBoard()
    setRemainingShips([])
  }

  return { remainingShips, clear, randomize }
}

export default usePregame
