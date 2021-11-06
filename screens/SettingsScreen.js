import React, { useState, useEffect } from 'react';
import { VStack, ScrollView, Stack, useToast, Box } from 'native-base';

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
import SettingsAlertComponent from '../components/alerts/SettingsAlertComponent';

import { styles } from '../styles/styles';

const SettingsScreen = (props) => {
   const [settingsLength, setSettingsLength] = useState(0);
   const [settingsLoaded, setSettingsLoaded] = useState(false);
   const [settingsSaved, setSettingsSaved] = useState(false);
   const [settingsChanged, setSettingsChanged] = useState(false);
   const [language, setLanguage] = useState(1);
   const [level, setLevel] = useState(1);
   const [infinitive, setInfinitive] = useState(true);
   const [present, setPresent] = useState(true);
   const [past, setPast] = useState(true);
   const [presPerf, setPresPerf] = useState(true);
   const [infinitiveChanged, setInfinitiveChanged] = useState(false);
   const [presentChanged, setPresentChanged] = useState(false);
   const [pastChanged, setPastChanged] = useState(false);
   const [presPerfChanged, setPresPerfChanged] = useState(false);
   const [confirmed, setConfirmed] = useState(false);
   const [destination, setDestination] = useState('');
   const [alertOpen, setAlertOpen] = useState(false);

   const navigation = useNavigation();

   const toast = useToast();

   useEffect(() => {
      let isMounted = true;
      if (confirmed) {
      setAlertOpen(false);
      navigation.navigate(destination);
      setConfirmed(false);
      return () => { isMounted = false };
      }
  }, [confirmed]);

  // useEffect cleanup
  useEffect(() => {
      return () => {};
  }, []);
  
  const confirm = () => {
      checkFormChanges();
      setSettingsChanged(false);
      setConfirmed(true);
  }

  const checkFormChanges = () => {
     if (infinitiveChanged) {
        setInfinitive(!infinitive);
     }
     if (presentChanged) {
      setPresent(!present);
     }
     if (pastChanged) {
      setPast(!past);
      }
      if (presPerfChanged) {
         setPresPerf(!presPerf);
      }
  }

   useEffect(() => {
      let isMounted = false;
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
      return () => { isMounted = false };
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
      setSettingsChanged(false);
      setSettingsSaved(true);
      fetchSettings();
      navigation.navigate('Aloitus');
      toast.show({
         render: () => {
            return (
               <Box backgroundColor='#66dd33' p='3'>
                  Asetukset tallennettu!
               </Box>
            )
         },
         placement: 'bottom',
         status: 'success',
         duration: 3000,
         isClosable: false
      });
   };

   return (
      <>
      <SettingsAlertComponent 
         alertOpen={alertOpen}
         setAlertOpen={setAlertOpen}
         confirm={confirm} 
      />
      <HeaderComponent title="Omat asetukseni" noArrow />
      <ScrollView style={styles(props).containerGrey}>
         {!settingsLoaded && <SpinnerComponent text="Ladataan asetuksia..." />}
         {settingsLoaded && (
            <>
            <Stack direction='column' alignItems='center'>
               <VStack>
                  <SettingsComponent
                     setLanguage={setLanguage}
                     setLevel={setLevel}
                     setSettingsChanged={setSettingsChanged}
                     language={language}
                     level={level}
                  />
               </VStack>
               <VStack>
                  <FormsSelector
                     setInfinitive={setInfinitive}
                     setPresent={setPresent}
                     setPast={setPast}
                     setPresPerf={setPresPerf}
                     setInfinitiveChanged={setInfinitiveChanged}
                     setPresentChanged={setPresentChanged}
                     setPastChanged={setPastChanged}
                     setPresPerfChanged={setPresPerfChanged}
                     setSettingsChanged={setSettingsChanged}
                     infinitive={infinitive}
                     present={present}
                     past={past}
                     presPerf={presPerf}
                  />
               </VStack>
               <VStack>
                  <SaveSettingsComponent
                     saveSettings={saveSettings}
                     settingsChanged={settingsChanged}
                     settingsSaved={settingsSaved}
                     infinitive={infinitive}
                     present={present}
                     past={past}
                     presPerf={presPerf}
                  />
               </VStack>
            </Stack>
            </>
         )}
      </ScrollView>
      <FooterComponent
         settingsChanged={settingsChanged}
         setSettingsChanged={setSettingsChanged}
         settingsSaved={settingsSaved}
         setDestination={setDestination}
         setAlertOpen={setAlertOpen} 
      />
   </>
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

export default connect(mapStateToProps)(SettingsScreen);
