import { useEffect } from 'react'
import FeatherIcon from 'react-native-vector-icons/dist/Feather'
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated'

export default function Loader() {
  const rotation = useSharedValue(0)

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 1000,
        easing: Easing.linear,
      }),
      -1
    )
    return () => cancelAnimation(rotation)
  }, [])

  const style = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateZ: `${rotation.value}deg`,
        },
      ],
    }
  }, [rotation.value])

  return (
    <Animated.View style={style}>
      <FeatherIcon name="loader" size={22} color="black" />
    </Animated.View>
  )
}
