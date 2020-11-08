import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { 
   Container, 
   Content,
} from 'native-base';

import { useNavigation } from '@react-navigation/native';

import DatabaseResults from '../../modules/DatabaseResults';
import ResultHistoryView from '../../components/ResultHistoryView';
import Heading from '../../components/Heading';
import HeaderComponent from '../../components/HeaderComponent';
import Subheading from '../../components/Subheading';
import FooterComponent from '../../components/FooterComponent';

const GermanHistoryScreen = props => {

   const [historyMeanings, setHistoryMeanings] = useState([]);
   const [historyForms, setHistoryForms] = useState([]);

   const navigation = useNavigation();

   useEffect(() => {

      DatabaseResults.transaction(
         tx => {
            tx.executeSql(
               'select * from results;', 
               [],
               (tx, results) => {
                  setHistoryMeanings(results.rows._array.filter(historyItem => historyItem.type === 1));
                  setHistoryForms(results.rows._array.filter(historyItem => historyItem.type === 2))
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

   }, [])

    return (
               <Container style={styles.container}>
                  <HeaderComponent title='Omat tulokseni' goBack={navigation.goBack} />
                  <Content style={styles.contentContainer}>
                     <Heading>
                        Verbien merkitykset
                     </Heading>
                     <Subheading>
                        Perustason verbit
                     </Subheading>
                     <ResultHistoryView
                        hideButton
                        resultHistory={historyMeanings.filter(historyItem => historyItem.level === 1)}
                     />
                  </Content>
                  <FooterComponent />
               </Container>
    );
}

export default GermanHistoryScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#d2d2d2',
  },
  contentContainer: {
     padding: 10
  },
  });
