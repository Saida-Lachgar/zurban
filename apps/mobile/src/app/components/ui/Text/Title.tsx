import { TextProps } from 'react-native'
import { Typography } from './Text'

export type TitleProps = TextProps

export default function Title(props: TitleProps) {
  return (
    <Typography
      {...props}
      style={[
        {
          fontFamily: 'Inter_700Bold',
          fontSize: 24,
          lineHeight: 29,
          color: '#333',
          maxWidth: 240,
        },
        props.style,
      ]}
    />
  )
}
