import { View } from 'react-native'
// import Board from '@/components/Board'
import PreGameControls from './PreGameControls'
import useGameSetup from 'shared/useGameSetup'

const GameSetup = () => {
  const gameSetup = useGameSetup()
  return (
    <View className="gap-2 ">
      <PreGameControls gameSetup={gameSetup} />
      {/* <Board gameSetup={gameSetup} /> */}
    </View>
  )
}

export default GameSetup
