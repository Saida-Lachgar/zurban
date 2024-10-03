import React, { useEffect, useState } from 'react'
import { Modal, Pressable, View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated'

export type BottomSheetProps = {
  children: React.ReactNode
  active: boolean
  onClose?: () => void
}

export default function BottomSheet({
  children,
  active,
  onClose,
}: BottomSheetProps) {
  const [visible, setVisible] = useState(false)

  const offset = useSharedValue(0)
  const opacity = useSharedValue(0)

  useEffect(() => {
    if (active) setVisible(true)
    else setTimeout(() => setVisible(false), 300)
  })

  const style = useAnimatedStyle(() => ({
    transform: [{ translateY: withSpring(offset.value) }],
    opacity: withTiming(opacity.value),
  }))

  useEffect(() => {
    if (active) (opacity.value = 1), (offset.value = 0)
    else (opacity.value = 0), (offset.value = 100)
  }, [active])

  return (
    <View style={{ position: 'absolute' }}>
      <Modal
        visible={visible}
        presentationStyle="overFullScreen"
        transparent
        style={{
          position: 'absolute',
          backgroundColor: 'transparent',
          padding: 16,
          zIndex: 100,
          bottom: 0,
          top: 0,
        }}
      >
        <Animated.View
          style={[
            {
              position: 'absolute',
              zIndex: 1,
              bottom: -24,
              left: 0,
              right: 0,
              justifyContent: 'center',
              alignItems: 'center',
            },
            style,
          ]}
        >
          <View
            style={{
              padding: 16,
              paddingBottom: 48,
              paddingTop: 40,
              backgroundColor: 'white',
              borderRadius: 24,
              maxWidth: 500,
              width: '100%',
            }}
          >
            {children}
          </View>
        </Animated.View>
        <Overlay active={active} onPress={onClose} />
      </Modal>
    </View>
  )
}

function Overlay({
  active,
  onPress,
}: {
  active: boolean
  onPress?: () => void
}) {
  const opacity = useSharedValue(0)

  const style = useAnimatedStyle(() => ({
    opacity: withTiming(opacity.value),
  }))

  useEffect(() => {
    if (active) opacity.value = 0.5
    else opacity.value = 0
  }, [active])

  return (
    <Pressable
      onPress={onPress}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <Animated.View
        style={[
          {
            backgroundColor: 'black',
            flex: 1,
            zIndex: 0,
          },
          style,
        ]}
      />
    </Pressable>
  )
}
