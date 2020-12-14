import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet } from 'react-native';
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
import { updateLanguage, updateLevel, updateInfinitive, updatePresent, updatePast, updatePresperf } from '../store/actions/settings';

import ButtonComponent from '../components/ButtonComponent';
import FooterComponent from '../components/FooterComponent';
import HeaderComponent from '../components/HeaderComponent';
import FormsSelector from '../components/FormsSelector';
import SpinnerComponent from '../components/SpinnerComponent';

import DatabaseSettings from '../modules/DatabaseSettings'
import SettingsComponent from '../components/SettingsComponent';

const StartScreen = (props) => {

   const [fontsLoaded, setFontsLoaded] = useState(false);
   const [settingsLength, setSettingsLength] = useState(0);
   const [saveButtonEnabled, setSaveButtonEnabled] = useState(false);
   const [settingsDbCreated, setSettingsDbCreated] = useState(false);
   const [settingsSaved, setSettingsSaved] = useState(false);
   const [settingsCleared, setSettingsCleared] = useState(false);
   const [settingsLoaded, setSettingsLoaded] = useState(false);
   const [initialized, setInitialized] = useState(false);

   const { navigation: {navigate} } = props;

   useEffect(() => {
      return () => {

      }
   }, [])

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
               "create table if not exists settings (id integer primary key not null, language int not null, level int not null, infinitive int not null, present int not null, past int not null, presperf int not null);"
            );
            console.log('Table created')
              },
            null,
            null, //updateList,
            (tx, error) => {
               console.log(error);
            }
         );
      DatabaseSettings.transaction(
         (tx) => {
         tx.executeSql(
            "select * from settings where id=1;",
            [],
            (tx, results) => {
               console.log(results)
                     setSettingsLength(results.rows._array.length)
                     if (results.rows._array.length > 0) {
                        props.dispatch(updateLanguage(results.rows._array[0].language))
                        props.dispatch(updateLevel(results.rows._array[0].level))
                        props.dispatch(updateInfinitive(results.rows._array[0].infinitive === 1 ? true : false))
                        props.dispatch(updatePresent(results.rows._array[0].present === 1 ? true : false))
                        props.dispatch(updatePast(results.rows._array[0].past === 1 ? true : false))
                        props.dispatch(updatePresperf(results.rows._array[0].presperf === 1 ? true : false))
                        setSettingsLoaded(true);
                     }
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
  }, [])

   useEffect(() => {
      let query;
      if (settingsLength === 0) {
         query = "insert into settings (language, level, infinitive, present, past, presperf) values (?, ?, ?, ?, ?, ?);"
      } else {
         query = "update settings set language = ?, level = ?, infinitive = ?, present = ?, past = ?, presperf = ? where id=1;"
      }
         DatabaseSettings.transaction(
            (tx) => {
              tx.executeSql(
               query,
                [
                   props.language,
                   props.level,
                   props.infinitive ? 1 : 0,
                   props.present ? 1 : 0,
                   props.past ? 1 : 0,
                   props.presperf ? 1 : 0,
                ],
               );
            },
            (error) => {
              console.log("Transaction error (Save): ", error);
            },
            null,
            null, //updateList
          );
  }, [props.level, props.language, props.infinitive, props.present, props.past, props.presperf]);
 
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

const clearSettings = () => {
   Alert.alert('testi');
   DatabaseSettings.transaction(
      tx => {
         tx.executeSql(
            'drop table if exists settings;', 
            [],
            (tx, results => {
               if (results && results.rows && results.rows._array) {
                  Alert.alert('Table dropped')
               } else {
                  Alert.alert('No results')
               }
            }),
            (tx, error) => {
               console.log('Could not execute query: ', error);
            }
         );
         
      },
      error => {
         console.log('Transaction error: ', error);
      },
   );
}

    return (
         <Container style={styles.container}>
            {!fontsLoaded && 
               <SpinnerComponent text='Ladataan fontteja...' />
            }
            {!settingsLoaded && 
               <SpinnerComponent text='Ladataan asetuksia...' />
            }
            {fontsLoaded && settingsLoaded &&
               <Container>
                  <HeaderComponent title='Verbivalmentaja' noArrow />
                  <Content style={styles.contentContainer}>
                     <ButtonComponent color='#7E00C5' title='Ruotsi' function={() => console.log('Ruotsi')} />
                     <ButtonComponent color='#7E00C5' title='Saksa' function={() => navigate('Saksa')} />
                     <ButtonComponent color='#4E00C5' title='Omat tulokseni' function={() => navigate('Omat tulokseni (saksa)')} />
                  <SettingsComponent clearSettings={clearSettings} />
                  <FormsSelector />
                  </Content>
                  <FooterComponent />
               </Container>
            }
         </Container>
    );
}

const mapStateToProps = state => ({
   language: state.settings.language,
   level: state.settings.level,
   infinitive: state.settings.tenses.infinitive,
   present: state.settings.tenses.present,
   past: state.settings.tenses.past,
   presperf: state.settings.tenses.presperf,
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
