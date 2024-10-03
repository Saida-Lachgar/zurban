import Ionicons from 'react-native-vector-icons/dist/Ionicons'
import { useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import { ProfileCard } from '../../model/profileCards'
import ListMenu from '../ListMenu/ListMenu'
import { Avatar } from '../ui/Avatar/Avatar'
import BottomSheet from '../ui/BottomSheet/BottomSheet'
import { palette } from '../ui/colors'
import Title from '../ui/Text/Title'

export type ProfileSharingCardProps = {
  profileCard: ProfileCard
}

export default function ProfileSharingCard({
  profileCard: { id, name, color, description },
}: ProfileSharingCardProps) {
  const [shareMenu, setShareMenu] = useState(false)

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: palette[color].color,
          borderRadius: 10,
          flex: 1,
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 16,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            alignContent: 'flex-start',
            gap: 16,
          }}
        >
          <View>
            <Avatar name={name} color={palette[color].foreground} />
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                textTransform: 'uppercase',
                fontFamily: 'Inter_700Bold',
              }}
            >
              {name}
            </Text>
            <Text>{description}</Text>
          </View>
        </View>
        <Pressable onPress={() => setShareMenu(true)}>
          <View
            style={{
              alignContent: 'flex-end',
              backgroundColor: 'rgba(0,0,0,0.1)',
              width: 34,
              height: 34,
              borderRadius: 34 / 2,
              justifyContent: 'center',
              alignItems: 'center',
              transform: [{ rotate: '-30deg' }],
            }}
          >
            <Ionicons name="send" color="rgba(0,0,0,0.5)" />
          </View>
        </Pressable>
      </View>

      <BottomSheet active={shareMenu} onClose={() => setShareMenu(false)}>
        <Title
          style={{
            textAlign: 'center',
            alignSelf: 'center',
            marginBottom: 16,
          }}
        >
          Share your infos
        </Title>
        <ListMenu
          items={[
            {
              label: 'Copy link',
              icon: 'copy',
              href: 'https://google.com',
            },
            {
              label: 'Display QR code',
              icon: 'qr-code',
              href: 'https://google.com',
            },
            {
              label: 'Share',
              icon: 'share',
              href: 'https://google.com',
            },
          ]}
        />
      </BottomSheet>
    </>
  )
}
