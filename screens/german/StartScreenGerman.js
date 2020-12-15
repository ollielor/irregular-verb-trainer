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
   Icon,
   Form
} from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { fetchVerbsGerman } from '../../store/actions/verbs';

import DatabaseVerbs from '../../modules/DatabaseVerbs';

import { connect } from 'react-redux';

import ButtonComponent from '../../components/buttons/ButtonComponent';
import FooterComponent from '../../components/footer/FooterComponent';
import HeaderComponent from '../../components/header/HeaderComponent';

const StartScreenGerman = props => {

   const navigation = useNavigation();

   useEffect(() => {
         DatabaseVerbs.transaction(
         (tx) => {
            tx.executeSql(
               'select * from verb_forms left join meanings on verb_forms.meaning_id=meanings.meaning_id',
               [],
               (tx, results) => {
                  console.log('Results: ', results.rows._array)
                  props.dispatch(fetchVerbsGerman(results.rows._array));
               },
               (tx, error) => {
                  console.log('Could not execute query: ', error)
               }
            )
         },
         (error) => {
            console.log('Transaction error: ', error)
         }
      )
   }, [])

    return (
            
               <Container style={styles.container}>
                  {console.log(props.verbsGerman)}
                  <HeaderComponent title='Saksa' goBack={navigation.goBack} />
                  <Content style={styles.contentContainer}>
                     <ButtonComponent color='#7E00C5' title='Selaa ja opettele verbejä' function={() => navigation.navigate('Selaa ja opettele (saksa)')} />
                     <ButtonComponent color='#7E00C5' title='Harjoittele verbien merkityksiä' function={() => navigation.navigate('Harjoittele merkityksiä (saksa)')} />
                     <ButtonComponent color='#7E00C5' title='Harjoittele verbien muotoja' function={() => navigation.navigate('Harjoittele muotoja (saksa)')} />
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
)(StartScreenGerman);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#d2d2d2',
  },
  contentContainer: {
     padding: 10
  },
  });
