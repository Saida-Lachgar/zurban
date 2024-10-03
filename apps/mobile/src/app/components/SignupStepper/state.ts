import { useFocusEffect } from '@react-navigation/native'
import { atom, useSetAtom } from 'jotai'

export const stepperAtom = atom<number>(0)
export const useSetStep = () => useSetAtom(stepperAtom)

export const useStep = (n: number) => {
  const setStep = useSetStep()
  useFocusEffect(() => {
    setStep(n)
  })
}
