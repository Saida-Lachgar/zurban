import { DefaultNavigatorOptions } from '@react-navigation/native'

export const SCREEN_OPTIONS: DefaultNavigatorOptions<any, any, any, any>['screenOptions'] = {
  headerShown: false,
  header: () => null,
  contentStyle: {
    backgroundColor: 'white',
  },
}
