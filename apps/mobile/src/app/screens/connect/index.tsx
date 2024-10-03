import { createStackNavigator } from '@react-navigation/stack'
import { SCREEN_OPTIONS } from '../../constants/screen'

import SignupScreen from './signup'
import SigninScreen from './signin'

const Stack = createStackNavigator();

export default function ConnectLayout() {
  return (
    <Stack.Navigator screenOptions={SCREEN_OPTIONS}>
      <Stack.Screen name="signup" component={SignupScreen} />
      <Stack.Screen name="signin" component={SigninScreen} />
    </Stack.Navigator>
  )
}
