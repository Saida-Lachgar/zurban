import { View } from 'react-native'
import { palette } from '../ui/colors'
import ScalePressable from '../ui/ScalePressable/ScalePressable'
import { Typography } from '../ui/Text/Text'

export type ColorsSelectorProps = {
  label: string
  value: string
  onChange: (value: string) => void
}

export default function ColorsSelector({
  label,
  value,
  onChange,
}: ColorsSelectorProps) {
  return (
    <View>
      <Typography
        style={{
          textTransform: 'uppercase',
          fontFamily: 'Inter_700Bold',
          fontSize: 12,
        }}
      >
        {label}
      </Typography>
      <View
        style={{
          gap: 16,
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginTop: 10,
        }}
      >
        {Object.entries(palette).map(([key, item]) => (
          <ScalePressable onPress={() => onChange(key)} key={key}>
            <View
              style={{
                height: 48,
                width: 48,
                borderRadius: 16,
                backgroundColor: item.foreground,
                borderWidth: 3,
                borderColor: key === value ? '#525252' : 'transparent',
              }}
            />
          </ScalePressable>
        ))}
      </View>
    </View>
  )
}
