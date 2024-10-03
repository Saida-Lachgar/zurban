import { forwardRef } from 'react'
import { TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native'
import * as colors from '../colors'
import Loader from '../Loader/Loader'
import { Typography } from '../Text/Text'

export type ButtonProps = {
  onPress?: () => void
  children: React.ReactNode
  containerStyle?: ViewStyle
  textStyle?: TextStyle
  loading?: boolean
  disabled?: boolean
}

const Button = forwardRef<View, ButtonProps>(function Button(
  { onPress, children, containerStyle, textStyle, loading, disabled },
  ref
) {
  return (
    <View ref={ref} style={{ flex: 1, opacity: loading || disabled ? 0.5 : 1 }}>
      <TouchableOpacity
        disabled={loading || disabled}
        onPress={onPress}
        style={[
          {
            backgroundColor: !(disabled || loading)
              ? colors.primary
              : colors.placeholder,
            borderRadius: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
          },
          containerStyle,
        ]}
      >
        <Typography
          style={[
            {
              color: disabled || loading ? 'black' : 'white',
              fontFamily: 'Inter_700Bold',
            },
            textStyle,
          ]}
        >
          {loading ? <Loader /> : children}
        </Typography>
      </TouchableOpacity>
    </View>
  )
})

export default Button
