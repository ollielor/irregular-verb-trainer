import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import StartScreen from './screens/StartScreen';
//import StartScreen from './screens/german/StartScreenGerman';

import BrowseScreen from './screens/german/BrowseScreen';
import MeaningsScreen from './screens/german/MeaningsScreen';
import HistoryScreen from './screens/german/HistoryScreen';
import FormsScreen from './screens/german/FormsScreen';

import DatabaseVerbsGerman from './modules/DatabaseVerbsGerman';
import DatabaseVerbsSwedish from './modules/DatabaseVerbsSwedish';

import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';

import { Provider } from 'react-redux';
import store from './store/store';

const Stack = createStackNavigator();

const App = () => {
   useEffect(() => {
      FileSystem.getInfoAsync(`${FileSystem.documentDirectory}SQLite`)
         .then((result) => {
            if (!result.exists) {
               FileSystem.makeDirectoryAsync(
                  `${FileSystem.documentDirectory}SQLite`,
                  { intermediates: true }
               );
            }
            return FileSystem.getInfoAsync(
               `${FileSystem.documentDirectory}SQLite/verbs_german.db`
            );
         })
         .then((result) => {
            if (result.exists) {
               DatabaseVerbsGerman;
            } else {
               FileSystem.downloadAsync(
                  Asset.fromModule(require('./assets/verbs_german.db')).uri,
                  `${FileSystem.documentDirectory}SQLite/verbs_german.db`
               );
            }
         })
         .catch((error) => {
            console.log(error);
         });
   }, []);

   useEffect(() => {
      FileSystem.getInfoAsync(`${FileSystem.documentDirectory}SQLite`)
         .then((result) => {
            if (!result.exists) {
               FileSystem.makeDirectoryAsync(
                  `${FileSystem.documentDirectory}SQLite`,
                  { intermediates: true }
               );
            }
            return FileSystem.getInfoAsync(
               `${FileSystem.documentDirectory}SQLite/verbs_swedish.db`
            );
         })
         .then((result) => {
            if (result.exists) {
               DatabaseVerbsSwedish;
            } else {
               FileSystem.downloadAsync(
                  Asset.fromModule(require('./assets/verbs_swedish.db')).uri,
                  `${FileSystem.documentDirectory}SQLite/verbs_swedish.db`
               );
            }
         })
         .catch((error) => {
            console.log(error);
         });
   }, []);


   return (
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
            </Stack.Navigator>
         </NavigationContainer>
      </Provider>
   );
};

export default App;
