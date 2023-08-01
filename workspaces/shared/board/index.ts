export type Board = [[number]]
export type Orientation = 'horizontal' | 'vertical'
export type Direction = [0 | 1 | -1, 0 | 1 | -1]
export type Position = [number, number]
export type Ship = {
  length: number
  positions: Position
  direction: Orientation
}

const structuredClone = window.structuredClone
  ? window.structuredClone
  : data => JSON.parse(JSON.stringify(data))

const { floor, ceil, random } = Math

export const BOARD_SIZE = 10
export const SHIPS = [5, 4, 3, 2, 2, 1, 1]
export const TOTAL_SQUARES = SHIPS.reduce((total, ship) => total + ship * ship, 0)

export const DIRECTIONS: [Directions] = [
  [0, 1],
  [0, -1],
  [-1, 0],
  [1, 0],
]

export const createBoard = (size: number = BOARD_SIZE): Board =>
  new Array(size).fill(null).map(line => new Array(size).fill(0))

export const randomBoard = (size: number = BOARD_SIZE, ships: [Ship] = SHIPS): [Ship] => {
  let board = createBoard(size)
  const theShips: [Ship] = []
  for (let ship of ships) {
    const theShip = placeShip(board, ship)
    theShips.push(theShip)
    theShip.positions.forEach(([x, y]) => (board[y][x] = ship))
  }

  return theShips
}

export const getBoardFromShips = (ships: [Ship]): Board => {
  const board = createBoard()
  for (let ship of ships) {
    for (let position of ship.positions) {
      const [x, y] = position
      board[y][x] = ship.length
    }
  }
  return board
}

export const placeShip = (board: Board, ship: number): Ship => {
  const size = board.length
  const startX = floor(random() * (size + 1 - ship))
  const startY = floor(random() * (size + 1 - ship))

  const allowedDirections = allowPlacing(board, ship, [startX, startY])
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
    direction: getOrientation([dx, dy]),
  }
}

const getOrientation = (
  direction: Direction,
  directions: [Direction] = DIRECTIONS
): Orientation => {
  for (let i = 0; i < directions.length; i++) {
    const orientation = directions[i]
    if (orientation[0] === direction[0] && orientation[1] === direction[1]) {
      return i < 2 ? 'horizontal' : 'vertical'
    }
  }
}

export const allowPlacing = (
  board: Board,
  ship: number,
  [x, y]: Position,
  directions: [Direction] = DIRECTIONS
): [Position] => {
  const allowed = []
  for (let direction of directions) {
    const [dx, dy] = direction
    const fx = x + ship * dx
    const fy = y + ship * dy
    if (fx > board.length || fx < 0 || fy > board.length || fy < 0) {
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
