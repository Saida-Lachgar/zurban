import { Pressable, ScrollView, View } from 'react-native'
import useEffectOnce from '../../../components/lib/useEffectOnce'
import ListMenu from '../../../components/ListMenu/ListMenu'
import ProfileSharingCard from '../../../components/ProfileSharingCard/ProfileSharingCard'
import { useNavigationBar } from '../../../components/TopNavigation/state'
import Button from '../../../components/ui/Button/Button'
import { ScreenRow } from '../../../components/ui/ScreenContainer'
import Label from '../../../components/ui/Text/Label'
import Paragraph from '../../../components/ui/Text/Paragraph'
import Title from '../../../components/ui/Text/Title'
import {
  useInsertDefaultProfileCard,
  useProfileCards,
} from '../../../model/profileCards'
import React from "react";

export const useProfile = () => {
  const {data: profileCards} = useProfileCards()

  const {mutateAsync: insertDefaultProfileCard} =
    useInsertDefaultProfileCard()

  useEffectOnce(() => void insertDefaultProfileCard())

  useNavigationBar({
    title: 'Profile',
    link: {
      href: '/profile/edit',
      label: 'Edit',
    },
  })

  return {
    profileCards,
  }
}

export default function ProfileScreen({navigation}) {
  const {profileCards} = useProfile()

  return (
    <>
      <ScrollView>
        <View style={{marginBottom: 32, zIndex: 0}}>
          <ScreenRow style={{marginVertical: 16}}>
            <Label>Share</Label>
          </ScreenRow>
          <ScreenRow style={{gap: 16}}>
            {profileCards?.map((profileCard) => (
              <ProfileSharingCard
                key={profileCard.id}
                profileCard={profileCard}
              />
            ))}
          </ScreenRow>
        </View>

        <View style={{position: 'relative'}}>
          <View
            style={{
              zIndex: 1,
              position: 'absolute',
              flex: 1,
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              justifyContent: 'center',
            }}
          >
            <ScreenRow>
              <Title
                style={{
                  textAlign: 'center',
                  alignSelf: 'center',
                  marginBottom: 8,
                }}
              >
                Get Started
              </Title>
              <Paragraph
                style={{
                  textAlign: 'center',
                  alignSelf: 'center',
                  marginBottom: 16,
                  fontFamily: 'Inter_700Bold',
                }}
              >
                Get the most out of your account by signing up for a free
                account.
              </Paragraph>
              <Button onPress={() => navigation.navigate('connect')}>Signup</Button>
            </ScreenRow>
          </View>

          <View style={{opacity: 0.2, zIndex: 0}}>
            <ScreenRow>
              <View style={{marginTop: 16, marginBottom: 8}}>
                <Label>Account</Label>
              </View>
              <ListMenu
                items={[
                  {
                    label: 'Sources',
                    icon: 'layers-outline',
                    href: '/profile/sources',
                  },
                  {
                    label: 'Change Password',
                    icon: 'key-outline',
                    href: '/profile/change-password',
                  },
                  {
                    label: 'Delete Account',
                    icon: 'trash-outline',
                    href: '/profile/delete-account',
                  },
                  {
                    label: 'Notifications',
                    icon: 'notifications-outline',
                    href: '/profile/notifications',
                  },
                ]}
              />
            </ScreenRow>
          </View>

          <View style={{opacity: 0.15, zIndex: 0}}>
            <ScreenRow>
              <View style={{marginTop: 16, marginBottom: 8}}>
                <Label>More</Label>
              </View>
              <ListMenu
                items={[
                  {
                    label: 'Premium',
                    icon: 'star-outline',
                    href: '/profile/premium',
                  },
                  {
                    label: 'Help',
                    icon: 'help-circle-outline',
                    href: '/profile/help',
                  },
                ]}
              />
            </ScreenRow>
          </View>
        </View>
      </ScrollView>
    </>
  )
}
