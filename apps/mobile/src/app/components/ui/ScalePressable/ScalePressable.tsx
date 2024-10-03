import { Pressable, ViewProps } from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

export default function ScalePressable({
  onPress,
  onLongPress,
  style: _style,
  ...props
}: ViewProps & {
  onPress?: () => void
  onLongPress?: () => void
}) {
  const scale = useSharedValue(1)

  const style = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withTiming(scale.value, {
            duration: 200,
            easing: Easing.elastic(1),
          }),
        },
      ],
    }
  })

  return (
    <Pressable
      onLongPress={onLongPress}
      onPress={onPress}
      onPressIn={() => {
        scale.value = 0.95
      }}
      onPressOut={() => {
        scale.value = 1
      }}
    >
      <Animated.View {...props} style={[style, _style]} />
    </Pressable>
  )
}
