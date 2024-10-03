import { TextProps } from 'react-native'
import { Typography } from './Text'
import * as colors from '../colors'

export type SurtitleProps = TextProps

export default function Surtitle(props: SurtitleProps) {
  return (
    <Typography
      {...props}
      style={[
        {
          fontFamily: 'Inter_500Medium',
          textTransform: 'uppercase',
          fontSize: 14,
          color: colors.surtitle,
        },
        props.style,
      ]}
    />
  )
}
