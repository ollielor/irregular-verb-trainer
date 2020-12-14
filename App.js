import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator} from'@react-navigation/stack';
import StartScreen from './screens/StartScreen';
import GermanStartScreen from './screens/german/GermanStartScreen';

import GermanBrowseScreen from './screens/german/GermanBrowseScreen';
import GermanMeaningsScreen from './screens/german/GermanMeaningsScreen';
import GermanHistoryScreen from './screens/german/GermanHistoryScreen';
import GermanFormsScreen from './screens/german/GermanFormsScreen';

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
               <Stack.Screen name='Saksa' component={GermanStartScreen} />
               <Stack.Screen name='Selaa ja opettele (saksa)' component={GermanBrowseScreen} />
               <Stack.Screen name='Harjoittele merkityksiä (saksa)' component={GermanMeaningsScreen} />
               <Stack.Screen name='Harjoittele muotoja (saksa)' component={GermanFormsScreen} />
               <Stack.Screen name='Omat tulokseni (saksa)' component={GermanHistoryScreen} />
            </Stack.Navigator>
         </NavigationContainer>
      </Provider>
    );
}

export default App;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#404040',
  },
  contentContainer: {
     padding: 10
  },
  centered: {
     color: '#fff',
     alignContent: 'center',
     alignItems: 'center'
  }
  });
