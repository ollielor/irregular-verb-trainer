import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import {
   Body,
   Button,
   Card,
   CardItem,
   Content,
   Spinner,
   Text,
} from 'native-base';

import { connect } from 'react-redux';

import { useNavigation } from '@react-navigation/native';

import Heading from '../styling/Heading';
import CardComponentResults from '../cards/CardComponentResults';

const ResultHistoryView = (props) => {
   const navigation = useNavigation();

   return (
      <Content>
         {!props.hideButton && <Heading>3 viimeisintä tulosta</Heading>}
         {props.resultHistory &&
            props.resultHistory
               .filter((result) => result.language === props.language)
               .sort((a, b) =>
                  a.datetime < b.datetime ? 1 : a.datetime > b.datetime ? -1 : 0
               )
               .map((historyItem, index) => (
                  <CardComponentResults historyItem={historyItem} key={index} />
               ))}
         {!props.hideButton && (
            <Button
               onPress={() => navigation.navigate('Omat tulokseni')}
               style={styles.historyButton}
            >
               <Text uppercase={false}>Näytä koko historia</Text>
            </Button>
         )}
      </Content>
   );
};

const mapStateToProps = (state) => ({
   language: state.settings.language
});

export default connect(mapStateToProps)(ResultHistoryView);

const styles = StyleSheet.create({
   header: {
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 24,
      color: '#4E00C5',
      marginTop: 20,
   },
   historyButton: {
      backgroundColor: '#4E00C5',
      alignSelf: 'center',
      marginTop: 20,
      marginBottom: 20,
   },
});
