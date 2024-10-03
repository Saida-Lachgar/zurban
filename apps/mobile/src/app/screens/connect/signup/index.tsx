import { createStackNavigator } from '@react-navigation/stack'
import { View } from 'react-native'
import SignupStepper from '../../../components/SignupStepper/SignupStepper'
import EmailScreen from './email'
import CodeScreen from './code'
import NameScreen from './name'
import ConfirmationScreen from './confirmation'

const Stack = createStackNavigator()

/**
 * TODO: Uncomment if we want to use tabs instead of stack
 */
// export function SignupHeader(options: {
//   route: { name: string; path?: string }
// }) {
//   return (
//     <View style={{ zIndex: 999999 }}>
//       <TopNavigation />
//       <SignupStepper />
//     </View>
//   )
// }

export default function SignupLayout() {
  return (
    <>
      <View style={{zIndex: 999999}}>
        <SignupStepper/>
      </View>
      <Stack.Navigator
        initialRouteName="launch"
        screenOptions={{
          header: () => null,
        }}
      >
        <Stack.Screen name="email" component={EmailScreen}/>
        <Stack.Screen name="code" component={CodeScreen}/>
        <Stack.Screen name="name" component={NameScreen}/>
        <Stack.Screen name="confirmation" component={ConfirmationScreen}/>
      </Stack.Navigator>
    </>
  )
}
