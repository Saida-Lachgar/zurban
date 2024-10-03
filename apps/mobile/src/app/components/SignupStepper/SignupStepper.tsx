import { useAtomValue } from 'jotai'
import React from 'react'
import { View } from 'react-native'
import { stepperAtom } from './state'
import { Step } from './Step'

export default function SignupStepper() {
  const currentStep = useAtomValue(stepperAtom)

  return (
    <View
      style={{
        backgroundColor: 'white',
        paddingHorizontal: 24,
        paddingVertical: 10,
        flexDirection: 'row',
        gap: 8,
      }}
    >
      <Step active />
      <Step active={currentStep >= 1} />
      <Step active={currentStep >= 2} />
      <Step active={currentStep === 3} />
    </View>
  )
}
