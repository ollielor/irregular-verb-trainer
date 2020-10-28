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

import ButtonComponent from '../../components/ButtonComponent';
import FooterComponent from '../../components/FooterComponent';
import HeaderComponent from '../../components/HeaderComponent';

const GermanBrowseScreen = props => {

   const [dbOpened, setDbOpened] = useState(false);
   const [verbsEasy, setVerbsEasy] = useState([]);
   const [verbsIntermediate, setVerbsIntermediate] = useState([]);
   const [verbsDifficult, setVerbsDifficult] = useState([]);

   const navigation = useNavigation();

      useEffect(() => {
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
      }, []);

      const db = SQLite.openDatabase('verbs_german.db');

      db.transaction(
         tx => {
            console.log('This is printed');
            tx.executeSql(
               'select * from verb_forms left join meanings on verb_forms.meaning_id=meanings.meaning_id where level=1;', 
               [],
               (tx, results) => {
                  console.log('executed Query');
                  console.log(results.rows._array);
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
         () => {
            console.log('Transaction done');
         }
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

   console.log('Verbs easy: ', verbsEasy);

    return (
               <Container style={styles.container}>
                  <HeaderComponent title='Selaa ja opettele' goBack={navigation.goBack} />
                  <Content style={styles.contentContainer}>
                     <Text style={{color: 'blue'}}>
                        Perustaso:
                     </Text>
                     {verbsEasy.map((verb, index) => { return <Text key={index}>{verb.infinitive}</Text> })}
                     <Text style={{color: 'blue'}}>
                        Keskitaso:
                     </Text>
                     {verbsIntermediate.map((verb, index) => { return <Text key={index}>{verb.infinitive}</Text> })}
                     <Text style={{color: 'blue'}}>
                        Mestarin taso:
                     </Text>
                     {verbsDifficult.map((verb, index) => { return <Text key={index}>{verb.infinitive}</Text> })}
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
