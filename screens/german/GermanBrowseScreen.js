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


import ButtonComponent from '../../components/ButtonComponent';
import FooterComponent from '../../components/FooterComponent';
import HeaderComponent from '../../components/HeaderComponent';

const GermanBrowseScreen = ({ navigation: { goBack }}) => {

   const [dbLoaded, setDbLoaded] = useState(false);
   const [verbs, setVerbs] = useState([]);

   FileSystem.downloadAsync(
      Asset.fromModule(require('../../assets/verbs_german.db')).uri,
      `${FileSystem.documentDirectory}SQLite/verbs_german.db`
     )

   const db = SQLite.openDatabase('verbs_german.db');

   console.log('Db: ', db);

   db.transaction(tx => {
      tx.executeSql('select * from verb_forms;', [], (_, { rows }) => {
         setVerbs(rows._array);
      });
   });

   console.log('Verbs: ', verbs);

    return (
               <Container style={styles.container}>
                  <HeaderComponent title='Selaa ja opettele' goBack={goBack} />
                  <Content style={styles.contentContainer}>
                     <Text>
                        Text
                     </Text>
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
