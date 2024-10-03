import { createStackNavigator } from '@react-navigation/stack'
import { SCREEN_OPTIONS } from '../../../constants/screen'
import RootScreen from './root'
import BookScreen from './book'
import AddScreen from './add'

const Stack = createStackNavigator();

export default function BooksLayout() {
  return (
    <Stack.Navigator screenOptions={SCREEN_OPTIONS}>
      <Stack.Screen name="index" component={RootScreen}/>
      <Stack.Screen name="book" component={BookScreen}/>
      <Stack.Screen name="add" component={AddScreen}/>
    </Stack.Navigator>
  )
}
