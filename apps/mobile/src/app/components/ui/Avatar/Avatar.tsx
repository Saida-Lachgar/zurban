import Ionicons from 'react-native-vector-icons/dist/Ionicons'
import { useMemo } from 'react'
import { View } from 'react-native'
import * as colors from '../colors'
import { Typography } from '../Text/Text'

interface AvatarProps {
  mode?: 'selected' | 'unselected' | 'normal'
  name: string
  size?: number
  color?: string
}

export type AvatarSelectionBoxProps = {
  selected?: boolean
}

export type AvatarContainerProps = {
  mode?: 'selected' | 'unselected' | 'normal'
  size?: number
  children?: React.ReactNode
  color?: string
}

export function AvatarContainer({
  children,
  mode = 'normal',
  size = 50,
  color = colors.primary,
}: AvatarContainerProps) {
  const borderStyle = useMemo(
    () =>
      ({
        selected: 'solid',
        unselected: 'dashed',
        normal: 'solid',
      }[mode]),
    [mode]
  ) as 'solid' | 'dashed'

  const backgroundColor = useMemo(
    () =>
      ({
        selected: colors.primary,
        unselected: 'transparent',
        normal: color,
      }[mode]),
    [mode]
  )

  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
        borderStyle,
        borderWidth: 2,
        borderColor: color,
      }}
    >
      {children}
    </View>
  )
}

export function Avatar({
  name,
  mode = 'normal',
  size = 50,
  color = colors.primary,
}: AvatarProps) {
  return (
    <AvatarContainer size={size} color={color} mode={mode}>
      {mode === 'normal' && (
        <Typography
          style={{
            fontSize: size / 2,
            lineHeight: (size / 2) * 1.5,
            fontWeight: 'bold',
            color: 'white',
          }}
        >
          {name.charAt(0).toUpperCase()}
        </Typography>
      )}
      {mode === 'selected' && (
        <Ionicons name="checkmark-circle" size={size / 2} color="white" />
      )}
    </AvatarContainer>
  )
}
