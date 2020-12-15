import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator} from'@react-navigation/stack';
import StartScreen from './screens/StartScreen';
import StartScreenGerman from './screens/german/StartScreenGerman';

import BrowseScreenGerman from './screens/german/BrowseScreenGerman';
import MeaningsScreenGerman from './screens/german/MeaningsScreenGerman';
import HistoryScreenGerman from './screens/german/HistoryScreenGerman';
import FormsScreenGerman from './screens/german/FormsScreenGerman';

import DatabaseVerbs from './modules/DatabaseVerbs';

import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';

import { Provider } from 'react-redux';
import store from './store/store';

const Stack = createStackNavigator();

const App = () => {

   useEffect(() => {
      FileSystem.getInfoAsync(`${FileSystem.documentDirectory}SQLite`)
         .then(result => {
            if (!result.exists) {
               FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}SQLite`, 
                  {intermediates: true}
               )
            }
            return FileSystem.getInfoAsync(`${FileSystem.documentDirectory}SQLite/verbs_german.db`);
         })
         .then(result => {
            if (result.exists) {
               DatabaseVerbs;
            } else {
               FileSystem.downloadAsync(
                  Asset.fromModule(require('./assets/verbs_german.db')).uri,
                  `${FileSystem.documentDirectory}SQLite/verbs_german.db`
               )
            }
         })
         .catch(error => {
            console.log(error);
         })
   }, [])


   return (
      <Provider store={store}>
         <NavigationContainer>
            <Stack.Navigator 
               screenOptions={{
                  headerShown: false
               }}>
               <Stack.Screen name='Koti' component={StartScreen} />
               <Stack.Screen name='Saksa' component={StartScreenGerman} />
               <Stack.Screen name='Selaa ja opettele (saksa)' component={BrowseScreenGerman} />
               <Stack.Screen name='Harjoittele merkityksiä (saksa)' component={MeaningsScreenGerman} />
               <Stack.Screen name='Harjoittele muotoja (saksa)' component={FormsScreenGerman} />
               <Stack.Screen name='Omat tulokseni (saksa)' component={HistoryScreenGerman} />
            </Stack.Navigator>
         </NavigationContainer>
      </Provider>
    );
}

export default App;

