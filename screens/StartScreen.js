import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, Text } from 'react-native';
import { Container, Content } from 'native-base';

import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import { connect } from 'react-redux';
import {
   updateLanguage,
   updateLevel,
   updateInfinitive,
   updatePresent,
   updatePast,
   updatePresperf,
} from '../store/actions/settings';

import ButtonComponent from '../components/buttons/ButtonComponent';
import FooterComponent from '../components/footer/FooterComponent';
import HeaderComponent from '../components/header/HeaderComponent';
import FormsSelector from '../components/settings/FormsSelector';
import SpinnerComponent from '../components/styling/SpinnerComponent';

import DatabaseSettings from '../modules/DatabaseSettings';
import SettingsComponent from '../components/settings/SettingsComponent';

const StartScreen = (props) => {
   const [fontsLoaded, setFontsLoaded] = useState(false);
   const [settingsLength, setSettingsLength] = useState(0);
   const [settingsEmpty, setSettingsEmpty] = useState(false);
   const [settingsLoaded, setSettingsLoaded] = useState(false);

   const {
      navigation: { navigate },
   } = props;

   useEffect(() => {
      return () => {};
   }, []);

   useEffect(() => {
      Font.loadAsync({
         Roboto: require('native-base/Fonts/Roboto.ttf'),
         Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
         ...Ionicons.font,
      })
         .then((result) => {
            setFontsLoaded(true);
         })
         .catch((error) => {
            console.log(error);
         });
   }, []);

   useEffect(() => {
      DatabaseSettings.transaction(
         (tx) => {
            tx.executeSql(
               'create table if not exists settings (id integer primary key not null, language integer, level integer, infinitive integer, present integer, past intteger, presperf integer);'
            );
         },
         null,
         null,
         (tx, error) => {
            console.log(error);
         }
      );
      fetchSettings();
   }, []);

   const fetchSettings = () => {
      DatabaseSettings.transaction(
         (tx) => {
            tx.executeSql(
               'select * from settings where id=1;',
               [],
               (tx, results) => {
                  if (results) {
                     setSettingsLength(results.rows._array.length);
                     if (results.rows._array.length > 0) {
                        props.dispatch(
                           updateLanguage(results.rows._array[0].language)
                        );
                        props.dispatch(
                           updateLevel(results.rows._array[0].level)
                        );
                        props.dispatch(
                           updateInfinitive(
                              results.rows._array[0].infinitive === 1
                                 ? true
                                 : false
                           )
                        );
                        props.dispatch(
                           updatePresent(
                              results.rows._array[0].present === 1
                                 ? true
                                 : false
                           )
                        );
                        props.dispatch(
                           updatePast(
                              results.rows._array[0].past === 1 ? true : false
                           )
                        );
                        props.dispatch(
                           updatePresperf(
                              results.rows._array[0].presperf === 1
                                 ? true
                                 : false
                           )
                        );
                     }
                  }
                  setSettingsLoaded(true);
               },
               (tx, error) => {
                  console.log('Could not execute query: ', error);
               }
            );
         },
         (error) => {
            console.log('Transaction error: ', error);
         }
      );
   };

   /*useEffect(() => {
      if (!settingsLoaded) {
         fetchSettings();
      }
   }, [settingsLoaded]);*/

   useEffect(() => {
      let query;
      if (settingsLength === 0 && settingsLoaded) {
         query =
            'insert into settings (language, level, infinitive, present, past, presperf) values (?, ?, ?, ?, ?, ?);';
      } else if (settingsLength > 0 && settingsLoaded) {
         query =
            'update settings set language = ?, level = ?, infinitive = ?, present = ?, past = ?, presperf = ? where id=1;';
      }
      DatabaseSettings.transaction(
         (tx) => {
            tx.executeSql(query, [
               props.language,
               props.level,
               props.infinitive ? 1 : 0,
               props.present ? 1 : 0,
               props.past ? 1 : 0,
               props.presperf ? 1 : 0,
            ]);
         },
         (error) => {
            console.log('Transaction error (Save): ', error);
         },
         null,
         null
      );
   }, [
      props.level,
      props.language,
      props.infinitive,
      props.present,
      props.past,
      props.presperf,
   ]);

   // This function is only used for testing purposes
   const clearSettings = () => {
      DatabaseSettings.transaction(
         (tx) => {
            tx.executeSql(
               'drop table if exists settings;',
               [],
               (tx,
               (results) => {
                  if (results && results.rows && results.rows._array) {
                     Alert.alert('Table dropped');
                  } else {
                     Alert.alert('No results');
                  }
               }),
               (tx, error) => {
                  console.log('Could not execute query: ', error);
               }
            );
         },
         (error) => {
            console.log('Transaction error: ', error);
         }
      );
   };

   return (
      <Container style={styles.container}>
         {!fontsLoaded && <SpinnerComponent text="Ladataan fontteja..." />}
         {!settingsLoaded && (
            <SpinnerComponent text="Ladataan asetuksia..." />
         )}
         {fontsLoaded && settingsLoaded && 
            <Container>
               <HeaderComponent title="Verbivalmentaja" noArrow />
               <Content style={styles.contentContainer}>
                  <ButtonComponent
                     color="#7E00C5"
                     title="Ruotsi"
                     function={() => console.log('Ruotsi')}
                  />
                  <ButtonComponent
                     color="#7E00C5"
                     title="Saksa"
                     function={() => navigate('Saksa')}
                  />
                  <ButtonComponent
                     color="#4E00C5"
                     title="Omat tulokseni"
                     function={() => navigate('Omat tulokseni (saksa)')}
                  />
                  <SettingsComponent />
                  <FormsSelector />
               </Content>
               <FooterComponent />
            </Container>
         }
      </Container>
   );
};

const mapStateToProps = (state) => ({
   language: state.settings.language,
   level: state.settings.level,
   infinitive: state.settings.tenses.infinitive,
   present: state.settings.tenses.present,
   past: state.settings.tenses.past,
   presperf: state.settings.tenses.presperf,
});

export default connect(mapStateToProps)(StartScreen);

const styles = StyleSheet.create({
   container: {
      backgroundColor: '#d2d2d2',
   },
   contentContainer: {
      padding: 10,
   },
});
