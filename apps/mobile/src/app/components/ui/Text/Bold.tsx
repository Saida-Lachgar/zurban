import { createElement } from 'react'
import { TextProps } from 'react-native'
import { Typography } from './Text'

export type BoldProps = TextProps

export default function Bold(props: BoldProps) {
  return (
    <Typography
      {...props}
      style={[
        {
          fontFamily: 'Inter_700Bold',
          color: '#333',
        },
        props.style,
      ]}
    />
  )
}
