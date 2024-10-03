import { TextProps } from 'react-native'
import { Typography } from './Text'

export type ParagraphProps = TextProps

export default function Paragraph(props: ParagraphProps) {
  return (
    <Typography
      {...props}
      style={[
        {
          fontFamily: 'Inter_500Medium',
          fontSize: 16,
          lineHeight: 24,
          color: '#333',
          maxWidth: 300,
        },
        props.style,
      ]}
    />
  )
}
