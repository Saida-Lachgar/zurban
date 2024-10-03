import { useEffect } from 'react'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated'
import { View } from 'react-native'

import * as colors from '../ui/colors'

export function Step({ active = false }: { active?: boolean }) {
  const widthPercentage = useSharedValue(0)

  useEffect(() => {
    setTimeout(() => {
      widthPercentage.value = active ? 1 : 0
    }, 100)
  }, [active])

  const style = useAnimatedStyle(() => {
    return { flex: withSpring(widthPercentage.value) }
  })
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        backgroundColor: colors.placeholder,
        borderRadius: 6,
        height: 6,
        overflow: 'hidden',
      }}
    >
      <Animated.View
        style={[
          {
            backgroundColor: colors.primary,
            height: 6,
            borderRadius: 6,
          },
          style,
        ]}
      />
    </View>
  )
}
