import { useFocusEffect } from '@react-navigation/native'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Pressable, TextInput, View } from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import { primary } from '../colors'
import Reveal from '../Reveal/Reveal'
import Title from '../Text/Title'

export type CodeInputProps = {
  length: number
  value: string
  onChange: (value: string) => void
  isDone: boolean
  disabled?: boolean
  onIsDoneChange: (isValid: boolean) => void
}

function CodeUnit({
                    char,
                    onPress,
                    focused,
                  }: {
  char: string
  onPress: () => void
  focused: boolean
}) {
  const offset = useSharedValue(0)

  useEffect(() => {
    if (focused) {
      offset.value = withSpring(-5)
    } else {
      offset.value = withSpring(0)
    }
  }, [focused])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withTiming(offset.value, {
          duration: 0.1,
          easing: Easing.bounce,
        }),
      },
    ],
  }))

  return (
    <Pressable onPress={onPress}>
      <Animated.View
        style={[
          {
            width: 60,
            height: 60,
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: focused ? 2 : 1,
            borderColor: focused ? primary : '#e3e5e6',
            backgroundColor: focused ? '#fff' : '#fcfcfc',
            transform: [{translateY: focused ? -10 : 0}],
          },
          animatedStyle,
        ]}
      >
        <Title
          style={{
            fontFamily: 'Inter_700Bold',
            fontSize: 28,
            marginLeft: 1,
          }}
        >
          {char}
        </Title>
      </Animated.View>
    </Pressable>
  )
}

export const padValue = (value: string, length: number, char: string) => {
  return useMemo(() => {
    const padded = value.padEnd(length, char)
    return padded
  }, [value, length])
}

export default function CodeInput({
                                    length,
                                    value,
                                    onChange,
                                    isDone,
                                    onIsDoneChange,
                                    disabled,
                                  }: CodeInputProps) {
  const [index, setIndex] = useState<number>(0)
  const ref = useRef<TextInput>(null)
  const _value = padValue(value, length, ' ')

  useEffect(() => {
    if (isDone) setTimeout(() => ref.current?.blur(), 200)
  }, [isDone])

  useFocusEffect(() => void setTimeout(() => ref.current?.focus(), 200))

  const onUnitPress = useCallback((i: number) => {
    if (disabled) return
    ref.current?.focus()
    onIsDoneChange(false)
    setIndex(i)
  }, [])

  const onUnitUpdate = useCallback(
    (char: string, nextIndex: number = Math.min(index + 1, length)) => {
      if (disabled) return
      if (index === length) return
      const nextValue = _value.slice(0, index) + char + _value.slice(index + 1)
      onChange(nextValue.slice(0, length))
      if (nextValue.replace(/\s/g, '').length === length) {
        onIsDoneChange(true)
      } else {
        onIsDoneChange(false)
      }
      setIndex(nextIndex)
    },
    [_value, index]
  )

  const onBackspacePress = useCallback(() => {
    if (disabled) return
    if (isDone) {
      // onIsDoneChange(false)
      // onChange(_value.slice(0, length - 1))
      // setIndex(length - 2)
      return
    }
    onUnitUpdate(' ', Math.max(index - 1, 0))
  }, [index])

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 16,
          opacity: isDone ? 0.5 : 1,
        }}
      >
        {Array.from({length: length}).map((_, i) => (
          <Reveal key={i} duration={400} delay={(length - 1 - i) * 200}>
            <CodeUnit
              char={value.charAt(i) || ''}
              onPress={() => onUnitPress(i)}
              focused={index === i || isDone}
            />
          </Reveal>
        ))}
      </View>
      <View
        style={{
          position: 'absolute',
          width: 1,
          height: 1,
          transform: [{translateX: 999999}],
        }}
      >
        <TextInput
          ref={ref}
          value=""
          keyboardType="number-pad"
          onChangeText={onUnitUpdate}
          onKeyPress={(native) => {
            if (native.nativeEvent.key === 'Backspace') {
              onBackspacePress()
            }
          }}
        />
      </View>
    </>
  )
}
