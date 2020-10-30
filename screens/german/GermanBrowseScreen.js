import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { 
   Container, 
   Button, 
   Text,
   Body,
   Left,
   Right, 
   Spinner, 
   Header,
   Title, 
   Content,
   Footer,
   FooterTab,
   Icon
} from 'native-base';

import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';

import { useNavigation } from '@react-navigation/native';

import FooterComponent from '../../components/FooterComponent';
import HeaderComponent from '../../components/HeaderComponent';
import CardComponent from '../../components/CardComponent';

const GermanBrowseScreen = props => {

   const [dbOpened, setDbOpened] = useState(false);
   const [verbsEasy, setVerbsEasy] = useState([]);
   const [verbsIntermediate, setVerbsIntermediate] = useState([]);
   const [verbsDifficult, setVerbsDifficult] = useState([]);

   const navigation = useNavigation();

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
               'select * from verb_forms left join meanings on verb_forms.meaning_id=meanings.meaning_id where level=1;', 
               [],
               (tx, results) => {
                  setVerbsEasy(results.rows._array);
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
      
         /*db.transaction(tx => {
            tx.executeSql('select * from verb_forms left join meanings on verb_forms.meaning_id=meanings.meanings_id where level=2;', [], (_, { rows }) => {
               setVerbsIntermediate(rows._array);
            });
         });
         db.transaction(tx => {
            tx.executeSql('select * from verb_forms left join meanings on verb_forms.meaning_id=meanings.meanings_id where level=3;', [], (_, { rows }) => {
               setVerbsDifficult(rows._array);
            });
         });*/

      /*const compare = (a, b) => {

         const verbA = a.infinitive;
         const verbB = b.infinitive;

          if (verbA > verbB) {
            return 1;
         } else if (verbB < verbB) {
            return -1;
         }
     }

     const verbsEasySorted = verbsEasy.sort(compare(a, b));*/
     



    return (
               <Container style={styles.container}>
                  <HeaderComponent title='Selaa ja opettele' goBack={navigation.goBack} />
                  <Content style={styles.contentContainer}>
                     <Text style={{color: '#7E00C5', fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>
                        Perustason verbit
                     </Text>
                     {(verbsEasy.sort((a,b) => a.infinitive > b.infinitive ? 1 : -1)).map((verb, index) => <CardComponent key={index} verb={verb} /> )}
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
