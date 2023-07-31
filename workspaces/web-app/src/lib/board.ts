const { floor, ceil, random } = Math

export const BOARD_SIZE = 10
export const SHIPS = [5, 4, 3, 2, 2, 1, 1]
export const TOTAL_SQUARES = SHIPS.reduce((total, ship) => total + ship * ship, 0)

export const DIRECTIONS = [
  [0, 1],
  [1, 0],
  [-1, 0],
  [0, -1],
]

export const createBoard = (size = BOARD_SIZE) =>
  new Array(size).fill(null).map(line => new Array(size).fill(null))

export const randomBoard = (size = BOARD_SIZE) => {
  let board = createBoard(size)
  for (let ship of SHIPS) {
    board = placeShip(board, ship)
  }
  return board
}

export const isValidBoard = board =>
  board.flat().reduce((total, ship) => total + (ship || 0), 0) === TOTAL_SQUARES

export const placeShip = (board, ship) => {
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

export const allowPlacing = (board, ship, x, y) => {
  const allowed = []
  for (let direction of DIRECTIONS) {
    const [dx, dy] = direction
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
