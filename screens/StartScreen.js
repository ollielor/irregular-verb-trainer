import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { 
   Container, 
   Button, 
   Body,
   Left,
   Right, 
   Spinner, 
   Header,
   Title, 
   Content,
   Icon
} from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import ButtonComponent from '../components/ButtonComponent';
import FooterComponent from '../components/FooterComponent';
import HeaderComponent from '../components/HeaderComponent';

import DatabaseSettings from '../modules/DatabaseSettings'
import SettingsComponent from '../components/SettingsComponent';

const StartScreen = ({navigation: {navigate}}) => {

   const [fontsLoaded, setFontsLoaded] = useState(false);
   const [settingsChanged, setSettingsChanged] = useState(false);
   const [level, setLevel] = useState(3);
   const [language, setLanguage] = useState(2);

   useEffect(() => {
      Font.loadAsync({
         Roboto: require('native-base/Fonts/Roboto.ttf'),
         Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
         ...Ionicons.font,
      })
         .then(result => {
            setFontsLoaded(true);
         })
         .catch(error => {
            console.log(error);
         })
  }, [])


  useEffect(() => {
   DatabaseSettings.transaction(
      (tx) => {
        tx.executeSql(
          "create table if not exists settings (id integer primary key not null, language int, level int);"
        );
      },
      null,
      updateList
    );
  }, [])

  const updateList = () => {
   DatabaseResults.transaction(
     (tx) => {
       tx.executeSql(
         "select * from settings;",
         [],
         (tx, results) => {
           setResultHistory(results.rows._array);
         },
         (tx, error) => {
           console.log("Could not execute query: ", error);
         }
       );
     },
     (error) => {
       console.log("Transaction error: ", error);
     }
   );
 };

 useEffect(() => {
 if (settingsChanged) {
   DatabaseResults.transaction(
     (tx) => {
       tx.executeSql(
         "insert into settings (language, level) values (?, ?);",
         [
            language,
            level
         ]
       );
     },
     (error) => {
       console.log("Transaction error: ", error);
     },
     null,
     updateList
   );
   setResultsSaved(true);
 }
 }, [settingsChanged])


  /*useEffect(() => {
   const loadFonts = async () => {
      try {
         await Font.loadAsync({
         Roboto: require('native-base/Fonts/Roboto.ttf'),
         Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
         ...Ionicons.font,
         })
         setIsReady(true);
      } catch (error) {
         console.log(error);
      }
   }
   loadFonts();
}, [])*/


    return (
         <Container style={styles.container}>
            {console.log('Language: ', language)}
            {console.log('Level ', level)}
            {!fontsLoaded && 
               <Spinner color='#7E00C5' />
            }
            {fontsLoaded &&
               <Container>
                  <HeaderComponent title='Verbivalmentaja' noArrow />
                  <Content style={styles.contentContainer}>
                     <ButtonComponent color='#7E00C5' title='Ruotsi' function={() => console.log('Ruotsi')} />
                     <ButtonComponent color='#7E00C5' title='Saksa' function={() => navigate('Saksa')} />
                     <ButtonComponent color='#4E00C5' title='Omat tulokseni' function={() => console.log('Omat tulokseni')} />
                  <SettingsComponent setLanguage={setLanguage} setLevel={setLevel} />
                  </Content>
                  <FooterComponent />
               </Container>
            }
         </Container>
    );
}

export default StartScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#d2d2d2',
  },
  contentContainer: {
     padding: 10
  },
  });
