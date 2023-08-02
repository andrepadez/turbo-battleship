import { View, Text } from 'react-native'

export const HorizontalRuler = ({ board }) => (
  <View className="flex-row ml-10">
    {board.map((col, idx) => (
      <View key={idx} className="flex justify-center w-8">
        <Text>{idx + 1}</Text>
      </View>
    ))}
  </View>
)

export const VerticalRuler = ({ board }) => (
  <View className="items-center gap-[15px] pt-2">
    {board.map((col, idx) => (
      <View key={idx} className="mr-2">
        <Text>{String.fromCharCode(64 + idx + 1)}</Text>
      </View>
    ))}
  </View>
)
