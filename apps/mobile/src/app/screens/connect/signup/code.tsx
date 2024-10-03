import React, { useCallback, useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native'
import { useStep } from '../../../components/SignupStepper/state'
import { useNavigationBar } from '../../../components/TopNavigation/state'
import Button from '../../../components/ui/Button/Button'
import CodeInput from '../../../components/ui/Input/CodeInput'
import { ScreenRow } from '../../../components/ui/ScreenContainer'
import TextualBlock from '../../../components/ui/TextualBlock/TextualBlock'

export default function Code({navigation}) {
  const [value, setValue] = useState('    ')
  const [isDone, setIsDone] = useState(false)

  useNavigationBar({
    canGoBack: true,
    link: {
      label: 'Change Email',
      href: '/connect/signup/email',
    },
  })

  useStep(1)

  const check = useCallback(() => {
    setTimeout(() => navigation.navigate('name'), 2000)
  }, [navigation])

  useEffect(() => {
    if (isDone) check()
  }, [check, isDone])

  return (
    <View style={{flex: 1}}>
      <ScrollView
        keyboardShouldPersistTaps="always"
        style={{flex: 1}}
        contentContainerStyle={{paddingTop: 32}}
      >
        <ScreenRow>
          <TextualBlock
            surtitle="Create an account"
            title="Got it, please confirm your email"
            description="Enter the 4-digit that we have sent via the email address asauvanet@gmail.com"
          />
        </ScreenRow>

        <View style={{marginVertical: 32}}>
          <CodeInput
            isDone={isDone}
            onIsDoneChange={setIsDone}
            length={4}
            value={value}
            onChange={setValue}
          />
        </View>
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
        <Button disabled={!isDone} loading={isDone} onPress={() => navigation.navigate('name')}>
          Next
        </Button>
      </ScreenRow>
    </View>
  )
}
