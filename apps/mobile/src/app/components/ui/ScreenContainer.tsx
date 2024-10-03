import { View } from 'react-native'
import { concatStyles } from './lib/styles'

export default function ScreenContainer(
  props: React.ComponentProps<typeof View>
) {
  return (
    <View
      {...props}
      style={concatStyles(
        {
          flex: 1,
          paddingVertical: 16,
          paddingHorizontal: 24,
        },
        props.style
      )}
    />
  )
}

export function ScreenRow(props: React.ComponentProps<typeof View>) {
  return (
    <View
      {...props}
      style={concatStyles(
        {
          paddingHorizontal: 24,
        },
        props.style
      )}
    />
  )
}
