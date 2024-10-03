import { TextProps } from 'react-native'
import { Typography } from './Text'

export type TextLinkProps = TextProps

export default function TextLink(props: TextLinkProps) {
  return (
    <Typography
      {...props}
      style={[
        {
          fontFamily: 'Inter_500Medium',
          fontSize: 12,
          color: '#0076FF',
        },
        props.style,
      ]}
    />
  )
}
