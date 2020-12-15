import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { 
   Container, 
   Content
} from 'native-base';

import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';

import { connect } from 'react-redux';

import { useNavigation } from '@react-navigation/native';

import DatabaseVerbs from '../../modules/DatabaseVerbs';

import FooterComponent from '../../components/footer/FooterComponent';
import HeaderComponent from '../../components/header/HeaderComponent';
import CardComponentBrowse from '../../components/cards/CardComponentBrowse';
import Heading from '../../components/styling/Heading';

const BrowseScreenGerman = props => {

   const [dbOpened, setDbOpened] = useState(false);
   const [verbs, setVerbs] = useState([]);
   const [verbsIntermediate, setVerbsIntermediate] = useState([]);
   const [verbsDifficult, setVerbsDifficult] = useState([]);

   const navigation = useNavigation();

   useEffect(() => {
      return () => {

      }
   }, [])

         /*FileSystem.getInfoAsync(`${FileSystem.documentDirectory}SQLite/verbs_german.db`)
         .then(result => {
         if (result.exists) {
            const db = SQLite.openDatabase('verbs_german.db');
         } else {
         FileSystem.downloadAsync(
            Asset.fromModule(require('../../assets/verbs_german.db')).uri,
            `${FileSystem.documentDirectory}SQLite/verbs_german.db`
         )}
         });

      const db = SQLite.openDatabase('verbs_german.db');*/

      /*DatabaseVerbs.transaction(
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
      );*/

    return (
               <Container style={styles.container}>
                  <HeaderComponent title='Selaa ja opettele' goBack={navigation.goBack} />
                  <Content style={styles.contentContainer}>
                     <Heading>
                        Taso 1
                     </Heading>
                     {props.verbsGerman.filter(verb => verb.level === 1).sort((a,b) => a.infinitive > b.infinitive ? 1 : -1).map((verb, index) => <CardComponentBrowse key={index} verb={verb} /> )}
                     <Heading>
                        Taso 2
                     </Heading>
                     {props.verbsGerman.filter(verb => verb.level === 2).sort((a,b) => a.infinitive > b.infinitive ? 1 : -1).map((verb, index) => <CardComponentBrowse key={index} verb={verb} /> )}
                     <Heading>
                        Taso 3
                     </Heading>
                     {props.verbsGerman.filter(verb => verb.level === 3).sort((a,b) => a.infinitive > b.infinitive ? 1 : -1).map((verb, index) => <CardComponentBrowse key={index} verb={verb} /> )}
                  </Content>
                  <FooterComponent />
               </Container>
    );
}

const mapStateToProps = state => ({
   verbsGerman: state.verbs.verbsGerman
})

export default connect(
   mapStateToProps,
)(BrowseScreenGerman);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#d2d2d2',
  },
  contentContainer: {
     padding: 10
  },
  });
