import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { 
   StyleProvider
} from 'native-base';

import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator} from'@react-navigation/stack';

//import commonColor from './native-base-theme/variables/commonColor';
import variables from './native-base-theme/variables/variables';
import getTheme from './native-base-theme/components';

import StartScreen from './screens/StartScreen';
import GermanStartScreen from './screens/german/GermanStartScreen';

import GermanBrowseScreen from './screens/german/GermanBrowseScreen';
import GermanMeaningsScreen from './screens/german/GermanMeaningsScreen';
import GermanHistoryScreen from './screens/german/GermanHistoryScreen';
import GermanFormsScreen from './screens/german/GermanFormsScreen';

import DatabaseVerbs from './modules/DatabaseVerbs';

import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';

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
            return FileSystem.downloadAsync(
               Asset.fromModule(require('./assets/verbs_german.db')).uri,
               `${FileSystem.documentDirectory}SQLite/verbs_german.db`
            )
         })
         .catch(error => {
            console.log(error);
         })
   }, [])

   return (
         <NavigationContainer>
            <Stack.Navigator 
               screenOptions={{
                  headerShown: false
               }}>
               <Stack.Screen name='Koti' component={StartScreen} />
               <Stack.Screen name='Omat tulokseni (saksa)' component={GermanHistoryScreen} />
               <Stack.Screen name='Saksa' component={GermanStartScreen} />
               <Stack.Screen name='Selaa ja opettele (saksa)' component={GermanBrowseScreen} />
               <Stack.Screen name='Harjoittele merkityksiä (saksa)' component={GermanMeaningsScreen} />
               <Stack.Screen name='Harjoittele muotoja (saksa)' component={GermanFormsScreen} />
            </Stack.Navigator>
         </NavigationContainer>
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
