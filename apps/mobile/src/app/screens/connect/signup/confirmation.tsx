import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import Contacts from 'react-native-contacts';
import { useStep } from '../../../components/SignupStepper/state'
import { useNavigationBar } from '../../../components/TopNavigation/state'
import Button from '../../../components/ui/Button/Button'
import { ScreenRow } from '../../../components/ui/ScreenContainer'
import TextualBlock from '../../../components/ui/TextualBlock/TextualBlock'

export default function Confirmation({navigation}) {
  const [contacts, setContacts] = useState<Contacts.Contact['phoneNumbers'][]>([])

  useNavigationBar({
    canGoBack: false,
    link: undefined,
  })
  useStep(3)

  useEffect(() => {
    setTimeout(async () => {
      const contacts = (await Contacts.getAll()).map(({phoneNumbers}) => phoneNumbers)
      setContacts(contacts)
    }, 2000)
  }, [])

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        marginTop: -164,
      }}
    >
      <ScreenRow
        style={{
          paddingVertical: 32,
          borderBottomWidth: 1,
          borderBottomColor: '#f0f0f0',
          gap: 16,
        }}
      >
        <TextualBlock
          surtitle="All set!"
          title="Enjoy your new Zurban account!"
          description="Go back to your profile to discover what you can do"
        />
        <Button onPress={() => navigation.navigate('profile')}>Go back to your profile</Button>
      </ScreenRow>
    </View>
  )
}
