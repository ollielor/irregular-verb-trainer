import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { Container, Content, Toast } from 'native-base';

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

import { useNavigation } from '@react-navigation/native';

import ButtonComponent from '../components/buttons/ButtonComponent';
import FooterComponent from '../components/footer/FooterComponent';
import HeaderComponent from '../components/header/HeaderComponent';
import FormsSelector from '../components/settings/FormsSelector';
import SpinnerComponent from '../components/styling/SpinnerComponent';

import DatabaseSettings from '../modules/DatabaseSettings';
import SettingsComponent from '../components/settings/SettingsComponent';

import { fetchVerbsGerman } from '../store/actions/verbs';
import { fetchVerbsSwedish } from '../store/actions/verbs';

import DatabaseVerbsGerman from '../modules/DatabaseVerbsGerman';
import DatabaseVerbsSwedish from '../modules/DatabaseVerbsSwedish';
import SaveSettingsComponent from '../components/settings/SaveSettingsComponent';

const StartScreen = (props) => {
   const [fontsLoaded, setFontsLoaded] = useState(false);
   const [settingsLength, setSettingsLength] = useState(0);
   const [settingsEmpty, setSettingsEmpty] = useState(false);
   const [settingsLoaded, setSettingsLoaded] = useState(false);
   const [settingsSaved, setSettingsSaved] = useState(false);

   const navigation = useNavigation();

   useEffect(() => {
      return () => {};
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

   const updateSettings = () => {
      setSettingsSaved(false);
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
            Toast.show({
                 text: "Asetukset tallennettu!",
                 position: "bottom",
                 type: "success",
                 duration: 5000
               })
         },
         (error) => {
            console.log('Transaction error (Save): ', error);
         },
         null,
         null
      );
   }

   useEffect(() => {
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
   }, []);

   useEffect(() => {
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
   }, []);


   return (
      <Container style={styles.container}>
         <HeaderComponent
            title="Omat asetukseni"
            goBack={navigation.goBack}
         />
         {!settingsLoaded && (
            <SpinnerComponent text="Ladataan asetuksia..." />
         )}
         {settingsLoaded && 
            <Container>
               <Content>
                  <SettingsComponent/>
                  <FormsSelector />
                  <SaveSettingsComponent updateSettings={updateSettings} settingsSaved={settingsSaved} />
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
