import React from 'react';
import { Root } from 'native-base';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import StartScreen from './screens/StartScreen';

import BrowseScreen from './screens/BrowseScreen';
import MeaningsScreen from './screens/MeaningsScreen';
import HistoryScreen from './screens/HistoryScreen';
import FormsScreen from './screens/FormsScreen';
import SettingsScreen from './screens/SettingsScreen';
import ShareResultsScreen from './screens/ShareResultsScreen';

import { Provider } from 'react-redux';
import store from './store/store';

const Stack = createStackNavigator();

const App = () => {

   return (
      <Root>
      <Provider store={store}>
         <NavigationContainer>
            <Stack.Navigator
               screenOptions={{
                  headerShown: false,
               }}
            >
               <Stack.Screen name="Koti" component={StartScreen} />
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
            </Stack.Navigator>
         </NavigationContainer>
      </Provider>
      </Root>
   );
};

export default App;
