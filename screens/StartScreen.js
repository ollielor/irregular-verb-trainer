import React, { useState, useEffect } from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { Container, Content } from 'native-base';

import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';

import { connect } from 'react-redux';
import {
   updateLanguage,
   updateLevel,
   updateInfinitive,
   updatePresent,
   updatePast,
   updatePresperf,
} from '../store/actions/settings';

import { useNavigation } from '@react-navigation/native';

import ButtonComponent from '../components/buttons/ButtonComponent';
import FooterComponent from '../components/footer/FooterComponent';
import HeaderComponent from '../components/header/HeaderComponent';
import SpinnerComponent from '../components/styling/SpinnerComponent';

import DatabaseSettings from '../modules/DatabaseSettings';

import { fetchVerbsGerman } from '../store/actions/verbs';
import { fetchVerbsSwedish } from '../store/actions/verbs';

import DatabaseVerbsGerman from '../modules/DatabaseVerbsGerman';
import DatabaseVerbsSwedish from '../modules/DatabaseVerbsSwedish';

const StartScreen = (props) => {
   const [fontsLoaded, setFontsLoaded] = useState(false);
   const [settingsLength, setSettingsLength] = useState(0);
   const [settingsLoaded, setSettingsLoaded] = useState(false);
   const [germanLoaded, setGermanLoaded] = useState(false);
   const [swedishLoaded, setSwedishLoaded] = useState(false);

   const navigation = useNavigation();

   console.log(StatusBar.currentHeight);

   useEffect(() => {
      const initializeDbGerman = async () => {
         const directory = await FileSystem.getInfoAsync(`${FileSystem.documentDirectory}SQLite`);
         console.log(directory);
         if (!directory.exists) {
            FileSystem.makeDirectoryAsync(
               `${FileSystem.documentDirectory}SQLite`,
               { intermediates: true }
            );
         }
         const file = await FileSystem.getInfoAsync(
            `${FileSystem.documentDirectory}SQLite/verbs_german.db`
         );
         console.log('File: ', file);
         if (!file.exists) {
               await FileSystem.downloadAsync(
                  Asset.fromModule(require('../assets/verbs_german.db')).uri,
                  `${FileSystem.documentDirectory}SQLite/verbs_german.db`
               );
         }
         setGermanLoaded(true);
      }
      initializeDbGerman();
   }, [])

   useEffect(() => {
      const initializeDbSwedish = async () => {
         const directory = await FileSystem.getInfoAsync(`${FileSystem.documentDirectory}SQLite`);
         console.log(directory);
         if (!directory.exists) {
            FileSystem.makeDirectoryAsync(
               `${FileSystem.documentDirectory}SQLite`,
               { intermediates: true }
            );
         }
         const file = await FileSystem.getInfoAsync(
            `${FileSystem.documentDirectory}SQLite/verbs_swedish.db`
         );
         console.log('File: ', file);
         if (!file.exists) {
               await FileSystem.downloadAsync(
                  Asset.fromModule(require('../assets/verbs_swedish.db')).uri,
                  `${FileSystem.documentDirectory}SQLite/verbs_swedish.db`
               );
         }
         setSwedishLoaded(true);
      }
      initializeDbSwedish();
   }, [])

   useEffect(() => {
      if (germanLoaded) {
         DatabaseVerbsGerman.transaction(
            (tx) => {
               tx.executeSql(
                  'select * from verb_forms left join meanings on verb_forms.meaning_id=meanings.meaning_id',
                  [],
                  (tx, results) => {
                     props.dispatch(fetchVerbsGerman(results.rows._array));
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
      }
   }, [germanLoaded]);

   useEffect(() => {
      if (swedishLoaded) {
         DatabaseVerbsSwedish.transaction(
            (tx) => {
               tx.executeSql(
                  'select * from verb_forms left join meanings on verb_forms.meaning_id=meanings.meaning_id',
                  [],
                  (tx, results) => {
                     props.dispatch(fetchVerbsSwedish(results.rows._array));
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
      }
   }, [swedishLoaded]);

   useEffect(() => {
      return () => {};
   }, []);

   useEffect(() => {
      const loadFonts = async() => {
         try {             
            await Font.loadAsync({
               Roboto: require('native-base/Fonts/Roboto.ttf'),
               Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
               ...Ionicons.font,
            })
            setFontsLoaded(true);  
         } catch (error) {
            console.log(error);
         };
      }
      loadFonts();
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

   return (
      <Container style={styles.container}>
         {!fontsLoaded && <SpinnerComponent text="Ladataan fontteja..." />}
         {!settingsLoaded && (
            <SpinnerComponent text="Ladataan asetuksia..." />
         )}
         {fontsLoaded && settingsLoaded && 
            <Container>
               <HeaderComponent title="Verbivalmentaja" noArrow />
               <>
               <Content style={styles.contentContainer}>
            <ButtonComponent
               color="#7E00C5"
               title="Selaa ja opettele verbejä"
               function={() => navigation.navigate('Selaa ja opettele')}
            />
            <ButtonComponent
               color="#7E00C5"
               title="Harjoittele verbien merkityksiä"
               function={() =>
                  navigation.navigate('Harjoittele merkityksiä')
               }
            />
            <ButtonComponent
               color="#7E00C5"
               title="Harjoittele verbien muotoja"
               function={() =>
                  navigation.navigate('Harjoittele muotoja')
               }
            />

                  <ButtonComponent
                     color="#4E00C5"
                     title="Omat tulokseni"
                     function={() => navigation.navigate('Omat tulokseni')}
                  />
                  <ButtonComponent
                     color="#4E00C5"
                     title="Omat asetukseni"
                     function={() => navigation.navigate('Omat asetukseni')}
                  />
                  </Content>
               </>
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
