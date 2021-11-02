import React, { useState, useEffect } from 'react';
import { Stack, VStack, ScrollView, Text } from 'native-base';

import { useFonts, Roboto_400Regular } from '@expo-google-fonts/roboto';

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

import { updateResults } from '../store/actions/results';

import { getResults, createResultsDb } from '../helpers/results';

import { useNavigation } from '@react-navigation/native';

import ButtonComponent from '../components/buttons/ButtonComponent';
import FooterComponent from '../components/footer/FooterComponent';
import HeaderComponent from '../components/header/HeaderComponent';
import SpinnerComponent from '../components/styling/SpinnerComponent';

import DatabaseSettings from '../modules/DatabaseSettings';

import { fetchVerbsGerman, fetchVerbsSwedish } from '../store/actions/verbs';

import DatabaseVerbsGerman from '../modules/DatabaseVerbsGerman';
import DatabaseVerbsSwedish from '../modules/DatabaseVerbsSwedish';
import DatabaseResults from '../modules/DatabaseResults';
import LatestResults from '../components/results/LatestResults';

import { styles } from '../styles/styles';

const StartScreen = (props) => {
   const [settingsLoaded, setSettingsLoaded] = useState(false);
   const [germanLoaded, setGermanLoaded] = useState(false);
   const [swedishLoaded, setSwedishLoaded] = useState(false);
   const [dbError, setDbError] = useState('');

   const navigation = useNavigation();

   let [fontsLoaded] = useFonts({
      Roboto_400Regular,
    });
  

   useEffect(() => {
      createResultsDb();
   }, []);

   useEffect(() => {
      const initializeDbGerman = async () => {
         const directory = await FileSystem.getInfoAsync(
            `${FileSystem.documentDirectory}SQLite`
         );
         if (!directory.exists) {
            FileSystem.makeDirectoryAsync(
               `${FileSystem.documentDirectory}SQLite`,
               { intermediates: true }
            );
         }
         const file = await FileSystem.getInfoAsync(
            `${FileSystem.documentDirectory}SQLite/verbs_german.db`
         );
         if (!file.exists) {
            await FileSystem.downloadAsync(
               Asset.fromModule(require('../assets/verbs_german.db')).uri,
               `${FileSystem.documentDirectory}SQLite/verbs_german.db`
            );
         }
         setGermanLoaded(true);
      };
      initializeDbGerman();
   }, []);

   useEffect(() => {
      const initializeDbSwedish = async () => {
         const directory = await FileSystem.getInfoAsync(
            `${FileSystem.documentDirectory}SQLite`
         );
         if (!directory.exists) {
            FileSystem.makeDirectoryAsync(
               `${FileSystem.documentDirectory}SQLite`,
               { intermediates: true }
            );
         }
         const file = await FileSystem.getInfoAsync(
            `${FileSystem.documentDirectory}SQLite/verbs_swedish.db`
         );
         if (!file.exists) {
            await FileSystem.downloadAsync(
               Asset.fromModule(require('../assets/verbs_swedish.db')).uri,
               `${FileSystem.documentDirectory}SQLite/verbs_swedish.db`
            );
         }
         setSwedishLoaded(true);
      };
      initializeDbSwedish();
   }, []);

   const updateResultsAsync = async () => {
      props.dispatch(updateResults(await getResults()));
   };

   useEffect(() => {
      updateResultsAsync();
   }, []);

   useEffect(() => {
      DatabaseResults.transaction(
         (tx) => {
            tx.executeSql(
               'create table if not exists results (id integer primary key not null, type integer, language integer, level integer, accuracy integer, q_total integer, points real, maxpoints integer, percentage real, datetime real);'
            );
         },
         null,
         null
      );
   }, []);

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
      DatabaseSettings.transaction(
         (tx) => {
            tx.executeSql(
               'create table if not exists settings (id integer primary key not null, language integer, level integer, infinitive integer, present integer, past integer, presperf integer);'
            );
            fetchSettings();
         },
         null,
         null,
         (tx, error) => {
            setDbError(error);
            console.log(error);
         }
      );

   }, []);

   const fetchSettings = () => {
      DatabaseSettings.transaction(
         (tx) => {
            tx.executeSql(
               'select * from settings where id=1;',
               [],
               (tx, results) => {
                     if (results.rows._array.length > 0) {
                        dispatchValues(results.rows._array[0]);
                        setSettingsLoaded(true);
                     } else {
                        insertValues(tx);
                  }
               },
               (tx, error) => {
                  setDbError(error);
                  console.log('Could not execute query: ', error);
               }
            );
         },
         (error) => {
            setDbError(error);
            console.log('Transaction error: ', error);
         }
      );
   };
   
   const dispatchValues = (settingsResults) => {
      props.dispatch(
         updateLanguage(settingsResults.language)
      );
      props.dispatch(
         updateLevel(settingsResults.level)
      );
      props.dispatch(
         updateInfinitive(
            settingsResults.infinitive === 1
               ? true
               : false
         )
      );
      props.dispatch(
         updatePresent(
            settingsResults.present === 1
               ? true
               : false
         )
      );
      props.dispatch(
         updatePast(
            settingsResults.past === 1 ? true : false
         )
      );
      props.dispatch(
         updatePresperf(
            settingsResults.presperf === 1
               ? true
               : false
         )
      );

   }

   const insertValues = (tx) => {
      tx.executeSql(
         'insert into settings (language, level, infinitive, present, past, presperf) values (?, ?, ?, ?, ?, ?);',
            [
               1,
               1,
               1,
               1,
               1,
               1
            ]
/*          [
            props.language,
            props.level,
            props.infinitive ? 1 : 0,
            props.present ? 1 : 0,
            props.past ? 1 : 0,
            props.presperf ? 1 : 0,
         ] */
      );
      
      fetchSettings();  
   }

   return (
     
      <>
         {fontsLoaded && settingsLoaded && (
            <>
            <ScrollView bg='#eee'>
            <Stack flex={1} style={styles(props).containerGrey}>
              <HeaderComponent title="Verbivalmentaja" noArrow />
              <VStack>
                     <ButtonComponent
                        color="#7E00C5"
                        title="Selaa ja opettele verbejä"
                        function={() =>
                           navigation.navigate('Selaa ja opettele')
                        }
                     />
                     </VStack>
                     <VStack>
                     <ButtonComponent
                        color="#7E00C5"
                        title="Harjoittele verbien merkityksiä"
                        function={() =>
                           navigation.navigate('Harjoittele merkityksiä')
                        }
                     />
                     </VStack>
                     <VStack>
                     <ButtonComponent
                        color="#7E00C5"
                        title="Harjoittele verbien muotoja"
                        function={() =>
                           navigation.navigate('Harjoittele muotoja')
                        }
                     />
                     </VStack>
                     <VStack>
                     <ButtonComponent
                        color="#4E00C5"
                        title="Omat tulokseni"
                        function={() => navigation.navigate('Omat tulokseni')}
                     />
                     </VStack>
                     <VStack>
                     <ButtonComponent
                        color="#4E00C5"
                        title="Omat asetukseni"
                        function={() => navigation.navigate('Omat asetukseni')}
                     />
                     </VStack>
                     <VStack>
                     <ButtonComponent
                        color="#4E00C5"
                        title="Ohjeet"
                        function={() => navigation.navigate('Ohjeet')}
                     />
                     </VStack>
                     <VStack>
                     <LatestResults count={5} showTypes />
                     </VStack>
                     <VStack>
               </VStack>
               </Stack>
            </ScrollView>
            <FooterComponent />
            </>
         )}

         {!fontsLoaded || !settingsLoaded && (
            <Stack flex={1} style={styles(props).containerGrey} safeAreaTop>
               <VStack>
                  {!fontsLoaded && <SpinnerComponent text="Ladataan fontteja..." />}
               </VStack>
               <VStack>
                  {!settingsLoaded && 
                  <>
                  <SpinnerComponent text="Ladataan asetuksia..." />
                  <Text textAlign='center'>
                     {dbError}
                  </Text>
                  <ButtonComponent
                        color="#4E00C5"
                        title="Lataa uudelleen"
                        function={fetchSettings}
                     />
                  </>
                  }
               </VStack>
            </Stack>
         )}
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
   results: state.results.results,
});

export default connect(mapStateToProps)(StartScreen);
