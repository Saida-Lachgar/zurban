import Ionicons from 'react-native-vector-icons/dist/Ionicons'
import React, { useEffect } from 'react'
import { Pressable } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import { primary } from '../colors'
import { Typography } from '../Text/Text'

export type StickyToastProps = {
  content: string
  active: boolean
  variant?: 'light' | 'default'
  onPress?: () => void
  renderIcon?: () => React.ReactNode
  offsetBottom?: number
}

export default function StickyToast({
  active,
  content,
  onPress,
  offsetBottom = 10,
  renderIcon = () => (
    <Ionicons
      name="add-circle"
      size={18}
      color={variant === 'default' ? 'white' : '#252525'}
    />
  ),
  variant = 'default',
}: StickyToastProps) {
  const offset = useSharedValue(0)
  const opacity = useSharedValue(0)

  const style = useAnimatedStyle(() => ({
    transform: [{ translateY: withSpring(offset.value) }],
    opacity: withTiming(opacity.value),
  }))

  useEffect(() => {
    if (active) (opacity.value = 1), (offset.value = 0)
    else (opacity.value = 0), (offset.value = 100)
  }, [active])

  return (
    <Pressable
      onPress={onPress}
      style={{
        position: 'absolute',
        bottom: offsetBottom,
        right: 0,
        left: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Animated.View
        style={[
          {
            backgroundColor: variant === 'default' ? primary : '#e0e0e0',
            zIndex: 1,
            padding: 10,
            paddingHorizontal: 15,
            left: 0,
            right: 0,
            borderRadius: 24,
            flexDirection: 'row',
            gap: 5,
            alignItems: 'center',
          },
          style,
        ]}
      >
        <Typography
          style={{
            color: variant === 'default' ? 'white' : '#252525',
            fontFamily: 'Inter_500Medium',
          }}
        >
          {content}
        </Typography>
        {renderIcon()}
      </Animated.View>
    </Pressable>
  )
}
