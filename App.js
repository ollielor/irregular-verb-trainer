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

const Stack = createStackNavigator();

const App = () => {

   return (
      <StyleProvider style={getTheme(variables)}>
         <NavigationContainer>
            <Stack.Navigator 
               screenOptions={{
                  headerShown: false
               }}>
               <Stack.Screen name='Koti' component={StartScreen} />
               <Stack.Screen name='Saksa' component={GermanStartScreen} />
               <Stack.Screen name='Selaa ja opettele (saksa)' component={GermanBrowseScreen} />
            </Stack.Navigator>
         </NavigationContainer>
      </StyleProvider>
    );
}

export default App;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#404040',
    //alignItems: 'center',
    //justifyContent: 'center'
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
