import { useFocusEffect } from '@react-navigation/native'
import { atom, useSetAtom } from 'jotai'

export type NavigationLink = {
  label: string
  href: string
}

export type NavigationButton = {
  label: string
  onClick: () => void
}

export type NavigationAction = NavigationLink | NavigationButton

export type NavigationState = {
  title?: string
  canGoBack?: boolean
  link?: NavigationAction
}

export const navigationStateAtom = atom<NavigationState | null>(null)
export const useSetNavigationBar = () => useSetAtom(navigationStateAtom)

export const useNavigationBar = (state: NavigationState | null) => {
  const setNavigation = useSetNavigationBar()
  useFocusEffect(() => {
    setNavigation(state)
  })
}

export const isNavigationLink = (x: any): x is NavigationLink => {
  return x.href !== undefined
}
