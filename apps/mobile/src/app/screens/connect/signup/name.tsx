import React, { useState } from 'react'
import { ScrollView, View } from 'react-native'
import { useStep } from '../../../components/SignupStepper/state'
import { useNavigationBar } from '../../../components/TopNavigation/state'
import Button from '../../../components/ui/Button/Button'
import Input from '../../../components/ui/Input/Input'
import Reveal from '../../../components/ui/Reveal/Reveal'
import { ScreenRow } from '../../../components/ui/ScreenContainer'
import Terms from '../../../components/ui/Text/Terms'
import TextLink from '../../../components/ui/Text/TextLink'
import TextualBlock from '../../../components/ui/TextualBlock/TextualBlock'

export default function Name({navigation}) {
  const [value, setValue] = useState('')

  useNavigationBar(null)
  useStep(2)

  return (
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
            title="Great! And what’s your name?"
          />
        </ScreenRow>
        <Reveal delay={300}>
          <ScreenRow style={{marginTop: 32}}>
            <Input
              placeholder="First name"
              value={value}
              onChangeText={setValue}
              keyboardType="default"
              autoCapitalize="words"
              autoCorrect={false}
              autoFocus
            />
          </ScreenRow>
        </Reveal>
        <Reveal delay={300}>
          <ScreenRow style={{marginTop: 16}}>
            <Input
              placeholder="Last name"
              value={value}
              onChangeText={setValue}
              keyboardType="default"
              autoCapitalize="words"
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
          By continuing, you agree to our <TextLink>Terms of Service</TextLink>{' '}
          and <TextLink>Privacy Policy</TextLink>.
        </Terms>
        <Button onPress={() => navigation.navigate('confirmation')}>Next</Button>
      </ScreenRow>
    </View>
  )
}
