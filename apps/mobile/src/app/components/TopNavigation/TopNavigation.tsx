import Ionicons from 'react-native-vector-icons/dist/Ionicons'
import { useAtomValue } from 'jotai'
import React from 'react'
import { Pressable, View, SafeAreaView } from 'react-native'
import * as colors from '../ui/colors'
import { Typography } from '../ui/Text/Text'
import { isNavigationLink, navigationStateAtom } from './state'

export default function TopNavigation() {
  // const router = useRouter()
  const navigationState = useAtomValue(navigationStateAtom)

  return (
    <SafeAreaView>
      <View
        style={{
          backgroundColor: 'white',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          height: 64,
          paddingHorizontal: 24,
        }}
      >
        {navigationState && (
          <>
            <Pressable onPress={router.back}>
              <View
                style={{
                  height: 48,
                  width: 48,
                  justifyContent: 'center',
                }}
              >
                {navigationState.canGoBack && (
                  <Ionicons name="arrow-back" size={22} />
                )}
              </View>
            </Pressable>
            {navigationState.title && (
              <Typography>{navigationState.title}</Typography>
            )}
            {navigationState.link && isNavigationLink(navigationState.link) && (
              // TODO: Fix navigation
              <Pressable>
                <Typography style={{ color: colors.primary }}>
                  {navigationState.link.label}
                </Typography>
              </Pressable>
              // <Link asChild href={navigationState.link.href}>
              //   <Typography style={{ color: colors.primary }}>
              //     {navigationState.link.label}
              //   </Typography>
              // </Link>
            )}

            {navigationState.link &&
              !isNavigationLink(navigationState.link) && (
                <Pressable onPress={navigationState.link.onClick}>
                  <Typography style={{ color: colors.primary }}>
                    {navigationState.link.label}
                  </Typography>
                </Pressable>
              )}
          </>
        )}
      </View>
    </SafeAreaView>
  )
}
