import Ionicons from 'react-native-vector-icons/dist/Ionicons'
import { ComponentProps } from 'react'
import { Pressable, View } from 'react-native'
import ScalePressable from '../ui/ScalePressable/ScalePressable'
import { Typography } from '../ui/Text/Text'

export type ListMenuItemProps = {
  icon: ComponentProps<typeof Ionicons>['name']
  label: string
  href: string
}

export function ListMenuItem({icon, label, href}: ListMenuItemProps) {
  return (
    // TODO: Fix navigation
    <Pressable>
      <ScalePressable>
        <View
          style={{
            paddingVertical: 16,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
            <Ionicons name={icon} size={18}/>
            <Typography>{label}</Typography>
          </View>
          <Ionicons name="chevron-forward"/>
        </View>
      </ScalePressable>
    </Pressable>
  )
}

export type ListMenuProps = {
  items: ListMenuItemProps[]
}

export default function ListMenu({items}: ListMenuProps) {
  return (
    <View>
      {items.map((item, index) => (
        <ListMenuItem key={index} {...item} />
      ))}
    </View>
  )
}
