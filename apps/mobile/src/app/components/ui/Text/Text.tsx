import { Text, TextProps } from 'react-native'
import { compareString } from '../../lib/sanitize'

interface TypographyProps extends TextProps {
  search?: string
}

export function Typography(props: TypographyProps) {
  const { search, children, style, ...rest } = props

  if (search) {
    const parts = children?.toString().split(new RegExp(`(${search})`, 'gi'))

    return (
      <Text
        style={[
          {
            fontFamily: 'Inter_500Medium',
            fontSize: 16,
            lineHeight: 24,
            color: '#333',
          },
          style,
        ]}
        {...rest}
      >
        {parts?.map((part, i) =>
          compareString(part, search) ? (
            <Text
              key={i}
              style={{ fontFamily: 'Inter_700Bold', color: 'black' }}
            >
              {part}
            </Text>
          ) : (
            part
          )
        )}
      </Text>
    )
  }

  return (
    <Text
      {...rest}
      style={[
        {
          fontFamily: 'Inter_500Medium',
          fontSize: 16,
          lineHeight: 24,
          color: '#333',
        },
        style,
      ]}
    >
      {children}
    </Text>
  )
}
