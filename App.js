import 'react-native-gesture-handler';
import React from 'react';
import { NativeBaseProvider, extendTheme } from 'native-base';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import StartScreen from './screens/StartScreen';
import BrowseScreen from './screens/BrowseScreen';
import MeaningsScreen from './screens/MeaningsScreen';
import HistoryScreen from './screens/HistoryScreen';
import FormsScreen from './screens/FormsScreen';
import SettingsScreen from './screens/SettingsScreen';
import ShareResultsScreen from './screens/ShareResultsScreen';
import InstructionsScreen from './screens/InstructionsScreen';

import { Provider } from 'react-redux';
import store from './store/store';

const Stack = createNativeStackNavigator();

const theme = extendTheme({
     components: {
       Text: {
         baseStyle: {
         },
         defaultProps: { size: 'lg' },
         sizes: {
           xl: { fontSize: '32px' },
           lg: { fontSize: '18px' },
           md: { fontSize: '10px' },
           sm: { fontSize: '6px' },
         },
       },
     },
   });

const App = () => {

   return (
      <NativeBaseProvider theme={theme}>
         <Provider store={store}>
            <NavigationContainer>
               <Stack.Navigator
                  initialRouteName='Koti'
                  screenOptions={{
                     headerShown: false,
                  }}
               >
                  <Stack.Screen 
                     name="Koti" 
                     component={StartScreen} 
                  />
                  <Stack.Screen
                     name="Selaa ja opettele"
                     component={BrowseScreen}
                  />
                  <Stack.Screen
                     name="Harjoittele merkityksiä"
                     component={MeaningsScreen}
                  />
                  <Stack.Screen
                     name="Harjoittele muotoja"
                     component={FormsScreen}
                  />
                  <Stack.Screen
                     name="Omat tulokseni"
                     component={HistoryScreen}
                  />
                  <Stack.Screen
                     name="Omat asetukseni"
                     component={SettingsScreen}
                  />
                  <Stack.Screen
                     name="Jaa tulokset"
                     component={ShareResultsScreen}
                  />
                  <Stack.Screen
                     name="Ohjeet"
                     component={InstructionsScreen}
                  />
               </Stack.Navigator>
            </NavigationContainer>
         </Provider>
      </NativeBaseProvider>
   );
};

export default App;
