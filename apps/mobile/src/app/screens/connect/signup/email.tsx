import React, { useState } from 'react'
import { Pressable, ScrollView, View } from 'react-native'
import { useStep } from '../../../components/SignupStepper/state'
import { useNavigationBar } from '../../../components/TopNavigation/state'
import Button from '../../../components/ui/Button/Button'
import Input from '../../../components/ui/Input/Input'
import Reveal from '../../../components/ui/Reveal/Reveal'
import { ScreenRow } from '../../../components/ui/ScreenContainer'
import Terms from '../../../components/ui/Text/Terms'
import TextLink from '../../../components/ui/Text/TextLink'
import TextualBlock from '../../../components/ui/TextualBlock/TextualBlock'

export default function Email({navigation}) {
  const [value, setValue] = useState('')

  useNavigationBar({
    canGoBack: true,
    link: {
      href: '/profile/connect/signin',
      label: 'Log In',
    },
  })

  useStep(0)

  return (
    <>
      <View
        style={{
          flex: 1,
        }}
      >
        <ScrollView
          keyboardShouldPersistTaps="always"
          style={{flex: 1}}
          contentContainerStyle={{paddingTop: 32}}
        >
          <ScreenRow>
            <TextualBlock
              surtitle="Create an account"
              title="Let’s start from your email"
              description="We'll send you a verification code to confirm your email."
            />
          </ScreenRow>
          <Reveal delay={300}>
            <ScreenRow style={{marginTop: 32}}>
              <Input
                placeholder="Email"
                value={value}
                onChangeText={setValue}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                autoFocus
              />
            </ScreenRow>
          </Reveal>
        </ScrollView>

        <ScreenRow
          style={{
            position: 'absolute',
            bottom: 24,
            left: 0,
            right: 0,
            gap: 8,
          }}
        >
          <Terms style={{textAlign: 'center', alignSelf: 'center'}}>
            By continuing, you agree to our{' '}
            <TextLink>Terms of Service</TextLink> and{' '}
            <TextLink>Privacy Policy</TextLink>.
          </Terms>
          <Button onPress={() => navigation.navigate('code')}>Next</Button>
        </ScreenRow>
      </View>
    </>
  )
}
