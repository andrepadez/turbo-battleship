const { floor, ceil, random } = Math

export const BOARD_SIZE = 10
export const SHIPS = [5, 4, 3, 2, 2, 1, 1]
export const TOTAL_SQUARES = SHIPS.reduce((total, ship) => total + ship * ship, 0)

export const DIRECTIONS = [
  [0, 1],
  [0, -1],
  [-1, 0],
  [1, 0],
]

export const createBoard = (size = BOARD_SIZE) =>
  new Array(size).fill(null).map(line => new Array(size).fill(0))

export const randomBoard = (size = BOARD_SIZE) => {
  let board = createBoard(size)
  const ships = []
  for (let ship of SHIPS) {
    const theShip = placeShip(board, ship)
    ships.push(theShip)
    theShip.positions.forEach(([x, y]) => {
      board[y][x] = ship
    })
  }

  return ships
}

export const isValidBoard = board =>
  board.flat().reduce((total, ship) => total + (ship || 0), 0) === TOTAL_SQUARES

export const placeShip = (board, ship) => {
  const size = board.length
  const startX = floor(random() * (size + 1 - ship))
  const startY = floor(random() * (size + 1 - ship))

  const allowedDirections = allowPlacing(board, ship, startX, startY)
  if (allowedDirections.length === 0) {
    return placeShip(board, ship)
  }
  const directionIdx = floor(random() * allowedDirections.length)
  const [dx, dy] = allowedDirections[directionIdx]
  const newBoard = structuredClone(board)
  const positions = []
  for (let i = 0; i < ship; i++) {
    positions.push([startY + dy * i, startX + dx * i])
  }

  return {
    length: ship,
    positions: positions.sort((a, b) => (a[0] > b[0] || a[1] > b[1] ? 1 : -1)),
    direction: getDirection([dx, dy]),
  }
}

const getDirection = tuple => {
  for (let i = 0; i < DIRECTIONS.length; i++) {
    const direction = DIRECTIONS[i]
    if (direction[0] === tuple[0] && direction[1] === tuple[1]) {
      return i < 2 ? 'horizontal' : 'vertical'
    }
  }
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
