import React, { useState, useEffect } from 'react';
import { Container, Content, Toast } from 'native-base';

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

import FooterComponent from '../components/footer/FooterComponent';
import HeaderComponent from '../components/header/HeaderComponent';
import FormsSelector from '../components/settings/FormsSelector';
import SpinnerComponent from '../components/styling/SpinnerComponent';

import DatabaseSettings from '../modules/DatabaseSettings';
import SettingsComponent from '../components/settings/SettingsComponent';

import SaveSettingsComponent from '../components/settings/SaveSettingsComponent';

import { styles } from '../styles/styles';

const StartScreen = (props) => {
   const [settingsLength, setSettingsLength] = useState(0);
   const [settingsLoaded, setSettingsLoaded] = useState(false);
   const [settingsSaved, setSettingsSaved] = useState(false);
   const [language, setLanguage] = useState(1);
   const [level, setLevel] = useState(1);
   const [infinitive, setInfinitive] = useState(true);
   const [present, setPresent] = useState(true);
   const [past, setPast] = useState(true);
   const [presPerf, setPresPerf] = useState(true);

   const navigation = useNavigation();

   // useEffect cleanup
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
                        setLanguage(results.rows._array[0].language);
                        props.dispatch(
                           updateLanguage(results.rows._array[0].language)
                        );
                        setLevel(results.rows._array[0].level);
                        props.dispatch(
                           updateLevel(results.rows._array[0].level)
                        );
                        setInfinitive(
                           results.rows._array[0].infinitive === 1
                              ? true
                              : false
                        );
                        props.dispatch(
                           updateInfinitive(
                              results.rows._array[0].infinitive === 1
                                 ? true
                                 : false
                           )
                        );
                        setPresent(
                           results.rows._array[0].present === 1 ? true : false
                        );
                        props.dispatch(
                           updatePresent(
                              results.rows._array[0].present === 1
                                 ? true
                                 : false
                           )
                        );
                        setPast(
                           results.rows._array[0].past === 1 ? true : false
                        );
                        props.dispatch(
                           updatePast(
                              results.rows._array[0].past === 1 ? true : false
                           )
                        );
                        setPresPerf(
                           results.rows._array[0].presperf === 1 ? true : false
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

   const saveSettings = () => {
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
               language,
               level,
               infinitive ? 1 : 0,
               present ? 1 : 0,
               past ? 1 : 0,
               presPerf ? 1 : 0,
            ]);
         },
         (error) => {
            console.log('Transaction error (Save): ', error);
         },
         null,
         null
      );
      fetchSettings();
      Toast.show({
         text: 'Asetukset tallennettu!',
         position: 'bottom',
         type: 'success',
         duration: 3000,
      });
      navigation.navigate('Koti');
   };

   return (
      <Container style={styles(props).containerGrey}>
         <HeaderComponent title="Omat asetukseni" noArrow />
         {!settingsLoaded && <SpinnerComponent text="Ladataan asetuksia..." />}
         {settingsLoaded && (
            <Container>
               <Content>
                  <SettingsComponent
                     setLanguage={setLanguage}
                     setLevel={setLevel}
                     language={language}
                     level={level}
                  />
                  <FormsSelector
                     setInfinitive={setInfinitive}
                     setPresent={setPresent}
                     setPast={setPast}
                     setPresPerf={setPresPerf}
                     infinitive={infinitive}
                     present={present}
                     past={past}
                     presPerf={presPerf}
                  />
                  <SaveSettingsComponent
                     saveSettings={saveSettings}
                     settingsSaved={settingsSaved}
                  />
               </Content>
               <FooterComponent />
            </Container>
         )}
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
