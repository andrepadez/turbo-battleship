import { useState } from 'react'
import { createBoard, randomBoard, BOARD_SIZE, SHIPS, getBoardFromShips } from 'shared/board'

const useGameSetup = () => {
  const [ships, setShips] = useState([])

  const randomizeBoard = () => setShips(randomBoard())

  const clearBoard = () => setShips([])

  return { SHIPS, ships, randomizeBoard, clearBoard }
}

export default useGameSetup
