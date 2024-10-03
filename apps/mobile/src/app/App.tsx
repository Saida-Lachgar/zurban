import React, { useRef } from 'react';
import { NavigationContainer, ThemeProvider, DefaultTheme } from '@react-navigation/native'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import RootNavigator from './screens'
import { DatabaseProvider } from './model/Provider'
import { useInitDatabase } from "./model/init";
import { useInsertDefaultBook } from "./model/books/hooks/useInsertDefaultBook";

export const App = () => {
  const {ready: dbReady, db} = useInitDatabase()
  const client = useRef(new QueryClient()).current

  /**
   * TODO
   * Initialize everything in one hook
   */
  const {ready: defaultBookReady} = useInsertDefaultBook(db, {
    enabled: dbReady,
  })

  // const [loaded, error] = useFonts({
  //   SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  //   ...FontAwesome.font,
  //   Inter_900Black,
  //   Inter_500Medium,
  //   Inter_700Bold,
  // })

  const ready = dbReady && defaultBookReady

  console.log({ready, dbReady, defaultBookReady})

  return (
    <ThemeProvider value={DefaultTheme}>
      <DatabaseProvider db={db}>
        <QueryClientProvider client={client}>
          <NavigationContainer>
            <RootNavigator/>
          </NavigationContainer>
        </QueryClientProvider>
      </DatabaseProvider>
    </ThemeProvider>
  );
};

export default App;
