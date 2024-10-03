import ScalePressable from '../ScalePressable/ScalePressable'
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5'
import { ComponentProps } from 'react'

export default function Base({
  icon,
  color,
  onPress,
}: {
  icon: ComponentProps<typeof FontAwesome5>['name']
  color: string
  onPress: () => void
}) {
  return (
    <ScalePressable
      onPress={onPress}
      style={{
        width: 50,
        height: 50,
        borderRadius: 16,
        backgroundColor: color,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <FontAwesome5 name={icon} size={30} color="white" />
    </ScalePressable>
  )
}
