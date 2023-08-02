import { View, Text } from 'react-native'
import { cn } from 'shared/cn'
import { BOARD_SIZE, createBoard } from 'shared/board'
import { HorizontalRuler, VerticalRuler } from './Rulers'
import Ships from './Ships'

function Board({ gameSetup }) {
  const { ships } = gameSetup
  const board = createBoard()
  return (
    <View className="items-center">
      <HorizontalRuler board={board} />
      <View className="flex-row">
        <VerticalRuler board={board} />
        <View className="relative flex-row bg-blue-300 border-2">
          {board.map((line, idxLine) => (
            <View key={idxLine} className="">
              {line.map((sq, idxSquare) => (
                <View key={idxSquare} className={`w-8 h-8 border-[1px] border-gray-200`}></View>
              ))}
            </View>
          ))}
          <Ships ships={ships} />
        </View>
      </View>
    </View>
  )
}

export default Board
