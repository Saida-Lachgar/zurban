import { useEffect } from 'react'
import { useIsFocused, useFocusEffect } from '@react-navigation/native'
import { View } from 'react-native'
import Animated, {
  Easing,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  WithTimingConfig,
} from 'react-native-reanimated'

export type AnimationType = 'fromBelow' | 'fromAbove' | 'fromLeft' | 'fromRight'

type Transform = (offset: SharedValue<number>) => any

export default function Reveal({
                                 delay = 0,
                                 duration = 800,
                                 animation = 'fromLeft',
                                 ...props
                               }: React.ComponentProps<typeof View> & {
  animation?: AnimationType
  delay?: number
  duration?: number
}) {
  const offset = useSharedValue(-10)
  const opacity = useSharedValue(0)
  const isFocused = useIsFocused()

  const style = useAnimatedStyle(() => {
    const config = {duration, easing: Easing.elastic(2)} as WithTimingConfig

    const animations: Record<AnimationType, Transform> = {
      fromBelow: (offset: SharedValue<number>) => ({
        transform: [{translateY: withTiming(offset.value, config)}],
      }),
      fromAbove: (offset: SharedValue<number>) => ({
        transform: [{translateY: withTiming(-offset.value, config)}],
      }),
      fromLeft: (offset: SharedValue<number>) => ({
        transform: [{translateX: withTiming(offset.value)}],
      }),
      fromRight: (offset: SharedValue<number>) => ({
        transform: [{translateX: withTiming(-offset.value, config)}],
      }),
    }

    return {
      opacity: withTiming(opacity.value, config),
      ...animations[animation ?? 'fromLeft'](offset),
    }
  })

  useEffect(() => {
    if (!isFocused) {
      offset.value = -10
      opacity.value = 0
    }
  }, [isFocused])

  useFocusEffect(() => {
    const timeout = setTimeout(() => {
      offset.value = 0
      opacity.value = 1
    }, delay)
    return () => clearTimeout(timeout)
  })

  return <Animated.View {...props} style={[props.style, style]}/>
}
