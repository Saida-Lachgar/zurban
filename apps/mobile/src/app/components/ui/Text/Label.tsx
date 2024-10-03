import { TextProps } from 'react-native'
import { Typography } from './Text'

export type LabelProps = TextProps

export default function Label(props: LabelProps) {
  return (
    <Typography
      {...props}
      style={[
        {
          fontFamily: 'Inter_700Bold',
          fontSize: 18,
          lineHeight: 23,
          color: '#333',
          maxWidth: 240,
        },
        props.style,
      ]}
    />
  )
}

export function MiniLabel(props: LabelProps) {
  return (
    <Typography
      {...props}
      style={[
        {
          fontFamily: 'Inter_500Medium',
          fontSize: 12,
          lineHeight: 19,
          textTransform: 'uppercase',
          color: '#333',
          maxWidth: 240,
        },
        props.style,
      ]}
    />
  )
}
