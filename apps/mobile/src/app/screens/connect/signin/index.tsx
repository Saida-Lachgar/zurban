import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import EmailScreen from './email'
import CodeScreen from './code'

const ConnectNavigator = createBottomTabNavigator();

export default function Signin() {
  return (
    <ConnectNavigator.Navigator>
      <ConnectNavigator.Screen name="email" component={EmailScreen}/>
      <ConnectNavigator.Screen name="code" component={CodeScreen}/>
    </ConnectNavigator.Navigator>
  )
}
