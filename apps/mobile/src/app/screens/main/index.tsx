import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BooksScreen from './books';
import SearchScreen from './search';
import ProfileScreen from './profile';

const MainNavigator = createBottomTabNavigator();

export default function MainLayout() {
  return (
    <MainNavigator.Navigator
      initialRouteName="books"
      safeAreaInsets={{ bottom: 10 }}
      screenOptions={{
        headerShown: false,
        header: () => null,
      }}
    >
      <MainNavigator.Screen
        name="books"
        component={BooksScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book-outline" size={size} color={color} />
          ),
        }}
      />
      <MainNavigator.Screen
        name="search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
        }}
      />
      <MainNavigator.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </MainNavigator.Navigator>
  )
}
