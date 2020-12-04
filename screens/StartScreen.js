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
   Text,
   Title, 
   Content,
   Icon
} from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import { connect } from 'react-redux';
import { saveSettings } from '../store/actions/settings';

import ButtonComponent from '../components/ButtonComponent';
import FooterComponent from '../components/FooterComponent';
import HeaderComponent from '../components/HeaderComponent';

import DatabaseSettings from '../modules/DatabaseSettings'
import SettingsComponent from '../components/SettingsComponent';

const StartScreen = (props) => {

   const [fontsLoaded, setFontsLoaded] = useState(false);
   const [databaseCreated, setDatabaseCreated] = useState(false);
   const [settingsSaved, setSettingsSaved] = useState(false);
   const [settings, setSettings] = useState({});
   const [level, setLevel] = useState(1);
   const [language, setLanguage] = useState(1);
   const [initialized, setInitialized] = useState(false);

   const { navigation: {navigate} } = props;

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
      null // updateList
    );
    DatabaseSettings.transaction(
      (tx) => {
        tx.executeSql(
          "select * from settings;",
          [],
          (tx, results) => {
             console.log('Settings: ', results);
            props.dispatch(saveSettings({
               language: results.rows._array[0].language,
               level: results.rows._array[0].level
            }));
            setLanguage(results.rows._array[0].language);
            setLevel(results.rows._array[0].level);
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
    setInitialized(true);
  }, [settingsSaved])

   useEffect(() => {
      let query;
      if (settings.length === 0) {
         query = "insert into settings (language, level) values (?, ?);"
      } else {
         query = "update settings set language = ?, level = ?;"
      }
      if (initialized) {
         DatabaseSettings.transaction(
            (tx) => {
              tx.executeSql(
                query,
                [
                   language,
                   level
                ]
              );
              props.dispatch(saveSettings({
                  language: language,
                  level: level
               }));
              setSettingsSaved(true);
            },
            (error) => {
              console.log("Transaction error (Save): ", error);
            },
            null,
            null //updateList()
          );
      }
  }, [language, level])

 
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

const mapStateToProps = state => ({
   language: state.settings.language,
   level: state.settings.level
 })
 
 
 export default connect(
   mapStateToProps,
 )(StartScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#d2d2d2',
  },
  contentContainer: {
     padding: 10
  },
  });
