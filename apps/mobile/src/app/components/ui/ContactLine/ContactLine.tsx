import { memo } from 'react'
import { View } from 'react-native'
import { useContactDetails } from '../../../model/native-contacts/hooks/useContactDetails'
import { Avatar } from '../Avatar/Avatar'
import { primary } from '../colors'
import ScalePressable from '../ScalePressable/ScalePressable'
import { Typography } from '../Text/Text'

interface ContactLineProps {
  contactId: string
  search?: string
  mode?: 'selected' | 'unselected' | 'normal'
  onPress?: (c: string) => void
  onLongPress?: (c: string) => void
}

export const ContactLine = memo(
  ({
    contactId,
    search,
    mode = 'normal',
    onLongPress,
    onPress,
  }: ContactLineProps) => {
    const contact = useContactDetails(contactId)

    if (!contact) return null

    return (
      <ScalePressable
        onLongPress={() => onLongPress?.(contact.id)}
        onPress={() => onPress?.(contact.id)}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 16,
            borderBottomColor: '#f0f0f0',
            borderBottomWidth: 1,
          }}
        >
          <Avatar name={contact.name} size={40} mode={mode} color={primary} />
          <View style={{ marginLeft: 8 }}>
            <Typography search={search} style={{ fontWeight: 'bold' }}>
              {contact.name}
            </Typography>
            <Typography
              style={{ fontSize: 12, color: '#777777' }}
              search={search}
            >
              {contact.phoneNumbers?.map((p) => p.number).join(', ')}
            </Typography>
          </View>
        </View>
      </ScalePressable>
    )
  }
)
