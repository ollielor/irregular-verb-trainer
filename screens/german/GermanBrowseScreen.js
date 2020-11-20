import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { 
   Container, 
   Content
} from 'native-base';

import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';

import { useNavigation } from '@react-navigation/native';

import FooterComponent from '../../components/FooterComponent';
import HeaderComponent from '../../components/HeaderComponent';
import CardComponentBrowse from '../../components/CardComponentBrowse';
import Heading from '../../components/Heading';

const GermanBrowseScreen = props => {

   const [dbOpened, setDbOpened] = useState(false);
   const [verbs, setVerbs] = useState([]);
   const [verbsIntermediate, setVerbsIntermediate] = useState([]);
   const [verbsDifficult, setVerbsDifficult] = useState([]);

   const navigation = useNavigation();

   useEffect(() => {
      return () => {

      }
   }, [])

         FileSystem.getInfoAsync(`${FileSystem.documentDirectory}SQLite/verbs_german.db`)
         .then(result => {
         if (result.exists) {
            const db = SQLite.openDatabase('verbs_german.db');
         } else {
         FileSystem.downloadAsync(
            Asset.fromModule(require('../../assets/verbs_german.db')).uri,
            `${FileSystem.documentDirectory}SQLite/verbs_german.db`
         )}
         });

      const db = SQLite.openDatabase('verbs_german.db');

      db.transaction(
         tx => {
            tx.executeSql(
               'select * from verb_forms left join meanings on verb_forms.meaning_id=meanings.meaning_id;', 
               [],
               (tx, results) => {
                  setVerbs(results.rows._array);
               },
               (tx, error) => {
                  console.log('Could not execute query: ', error);
               }
            );
         },
         error => {
            console.log('Transaction error: ', error);
         },
      );

    return (
               <Container style={styles.container}>
                  <HeaderComponent title='Selaa ja opettele' goBack={navigation.goBack} />
                  <Content style={styles.contentContainer}>
                     <Heading>
                        Perustason verbit
                     </Heading>
                     {verbs.filter(verb => verb.level === 1).sort((a,b) => a.infinitive > b.infinitive ? 1 : -1).map((verb, index) => <CardComponentBrowse key={index} verb={verb} /> )}
                     <Heading>
                        Keskitason verbit
                     </Heading>
                     {verbs.filter(verb => verb.level === 2).sort((a,b) => a.infinitive > b.infinitive ? 1 : -1).map((verb, index) => <CardComponentBrowse key={index} verb={verb} /> )}
                     <Heading>
                        Haastavat verbit
                     </Heading>
                     {verbs.filter(verb => verb.level === 3).sort((a,b) => a.infinitive > b.infinitive ? 1 : -1).map((verb, index) => <CardComponentBrowse key={index} verb={verb} /> )}
                  </Content>
                  <FooterComponent />
               </Container>
    );
}

export default GermanBrowseScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#d2d2d2',
  },
  contentContainer: {
     padding: 10
  },
  });
