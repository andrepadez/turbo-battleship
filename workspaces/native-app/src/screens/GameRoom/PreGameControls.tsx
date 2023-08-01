import { useState } from 'react'
import { View, Text, Button } from 'react-native'
import { cn } from 'shared/cn'
import useSocket from 'shared/useSocket'

const PreGameControls = ({ gameSetup }) => {
  const { SHIPS, ships, clearBoard, randomizeBoard } = gameSetup
  const [remainingShips, setRemainingShips] = useState(SHIPS)
  const { socket } = useSocket()

  const clear = () => {
    clearBoard()
    setRemainingShips(SHIPS)
  }

  const randomize = () => {
    randomizeBoard()
    setRemainingShips([])
  }

  return (
    <View className="">
      <View className="flex-row justify-around p-10">
        <View className="gap-2 h-[100px] w-[45%] justify-around">
          {remainingShips
            // .slice(0, 1)
            .filter((s, i) => i % 2 === 0)
            .map((ship, idxShip) => (
              <Ship key={idxShip} ship={ship} />
            ))}
        </View>
        <View className="gap-2 w-[45%] justify-between">
          {remainingShips
            .filter((s, i) => i % 2 === 1)
            .map((ship, idxShip) => (
              <Ship key={idxShip} ship={ship} />
            ))}
        </View>
      </View>
      <View className="flex-row items-end justify-around">
        <Button title="Random" onPress={randomize} />
        {!remainingShips.length && (
          <>
            <Button title="Clear" onPress={clear} />
            <Button title="Start Game" onPress={() => {}} />
          </>
        )}
      </View>
    </View>
  )
}

export default PreGameControls

const Ship = ({ ship }) => (
  <View className="flex-row">
    {new Array(ship).fill(null).map((sq, idxSq) => (
      <View key={idxSq} className="bg-black mr-[2px] h-5 w-5"></View>
    ))}
  </View>
)
