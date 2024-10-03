import { TextProps } from 'react-native'
import { Typography } from './Text'

export type TermsProps = TextProps

export default function Terms(props: TermsProps) {
  return (
    <Typography
      {...props}
      style={[
        {
          fontFamily: 'Inter_500Medium',
          fontSize: 12,
          lineHeight: 16,
          color: '#333',
          maxWidth: 300,
        },
        props.style,
      ]}
    />
  )
}
