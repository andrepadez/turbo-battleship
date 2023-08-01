import { describe, it, expect } from 'vitest'
import { createBoard, randomBoard, BOARD_SIZE, SHIPS, getBoardFromShips } from './'

describe('Battleship Board', () => {
  describe('createBoard()', () => {
    it('creates an empty board with default size', () => {
      const board = createBoard()
      expect(board.length).toEqual(BOARD_SIZE)
      board.every(line => {
        expect(line.length).toEqual(BOARD_SIZE)
      })
    })

    it('creates an empty board with custom size', () => {
      const customSize = 20
      const board = createBoard(customSize)
      expect(board.length).toEqual(customSize)
      board.every(line => {
        expect(line.length).toEqual(customSize)
      })
    })
  })

  describe('randomBoard()', () => {
    const ships = randomBoard()
    it('places the exact amount of ships', () => {
      expect(ships.length).toEqual(SHIPS.length)
    })

    it('no ship overlaps another', () => {
      const allPositions = ships
        .map(ship => ship.positions)
        .flat()
        .map(pos => pos.toString())
      const uniquePositions = new Set(allPositions)
      expect(allPositions.length).toEqual(uniquePositions.size)
    })

    it('randomizes with good performance', () => {
      const startTime = performance.now()
      for (let i = 0; i < 1000; i++) {
        randomBoard()
      }
      const endTime = performance.now()
      expect(endTime - startTime).toBeLessThan(100)
    })
  })

  describe('getBoardFromShips()', () => {
    const ships = randomBoard()
    it('returns a board with the marked ships', () => {
      const board = getBoardFromShips(ships)
      for (let ship of ships) {
        for (let position of ship.positions) {
          const [x, y] = position
          expect(board[y][x]).toEqual(ship.length)
        }
      }
    })

    it('delivers the desired board from the mocked ships', () => {
      const board = getBoardFromShips(mockShips)
      expect(JSON.stringify(board)).toEqual(JSON.stringify(mockedBoardFromShips))
    })
  })
})

const mockShips = [
  {
    length: 5,
    positions: [
      [1, 1],
      [1, 2],
      [1, 3],
      [1, 4],
      [1, 5],
    ],
    direction: 'vertical',
  },
  {
    length: 4,
    positions: [
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
    ],
    direction: 'vertical',
  },
  {
    length: 3,
    positions: [
      [7, 4],
      [7, 5],
      [7, 6],
    ],
    direction: 'vertical',
  },
  {
    length: 2,
    positions: [
      [3, 2],
      [3, 3],
    ],
    direction: 'vertical',
  },
  {
    length: 2,
    positions: [
      [6, 1],
      [7, 1],
    ],
    direction: 'horizontal',
  },
  { length: 1, positions: [[6, 9]], direction: 'vertical' },
  { length: 1, positions: [[4, 7]], direction: 'horizontal' },
]

const mockedBoardFromShips = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [4, 5, 0, 0, 0, 0, 2, 2, 0, 0],
  [4, 5, 0, 2, 0, 0, 0, 0, 0, 0],
  [4, 5, 0, 2, 0, 0, 0, 0, 0, 0],
  [4, 5, 0, 0, 0, 0, 0, 3, 0, 0],
  [0, 5, 0, 0, 0, 0, 0, 3, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 3, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
]
