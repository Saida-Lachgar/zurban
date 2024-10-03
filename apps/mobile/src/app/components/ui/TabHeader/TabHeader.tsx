import { useState } from 'react'
import { useWindowDimensions, View } from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated'
import ScalePressable from '../ScalePressable/ScalePressable'
import { ScreenRow } from '../ScreenContainer'
import { Typography } from '../Text/Text'

function Item({
  onPress,
  label,
  selected,
}: {
  onPress?: () => void
  label: string
  selected?: boolean
}) {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <ScalePressable
        onPress={onPress}
        style={{
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography
          style={{
            fontSize: 14,
            fontWeight: 'bold',
            color: selected ? 'black' : '#727272',
          }}
        >
          {label}
        </Typography>
      </ScalePressable>
    </View>
  )
}

function Focus({
  totalItems,
  currentIndex,
}: {
  totalItems: number
  currentIndex: number
}) {
  const itemWidth = (useWindowDimensions().width - 48 - 8) / totalItems

  const style = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(itemWidth * currentIndex, {
            duration: 300,
            easing: Easing.elastic(1),
          }),
        },
      ],
    }
  })

  return (
    <Animated.View
      style={[
        style,
        {
          position: 'absolute',
          borderRadius: 6,
          width: itemWidth,
          padding: 2,
          top: 4,
          bottom: 4,
          left: 4,
          backgroundColor: 'white',
        },
      ]}
    ></Animated.View>
  )
}

export default function TabHeader() {
  const [currentIndex, setCurrentIndex] = useState(0)

  return (
    <ScreenRow>
      <View
        style={{
          position: 'relative',
          backgroundColor: '#f0f0f0',
          padding: 2,
          flexDirection: 'row',
          borderRadius: 8,
          height: 40,
        }}
      >
        <Focus currentIndex={currentIndex} totalItems={2} />
        <Item
          selected={currentIndex === 0}
          label="Informations"
          onPress={() => setCurrentIndex(0)}
        />
        <Item
          selected={currentIndex === 1}
          label="Activity"
          onPress={() => setCurrentIndex(1)}
        />
      </View>
    </ScreenRow>
  )
}
