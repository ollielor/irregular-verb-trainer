import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Body, Button, Card, CardItem, Content, Text } from 'native-base';

import moment from 'moment';

import { useNavigation } from '@react-navigation/native';

import { connect } from 'react-redux';

import Heading from '../styling/Heading';
import CardComponentResults from '../cards/CardComponentResults';

const LatestResultsGerman = (props) => {
   const navigation = useNavigation();

   return (
      <Content>
         <Heading>{props.count} viimeisintä tulosta {props.language === 1 ? '(ruotsi)' : '(saksa)'}</Heading>
         {props.resultHistory &&
            props.resultHistory
               .filter((historyItem) => historyItem.type === props.type)
               .filter((historyItem) => historyItem.language === props.language)
               .sort((a, b) =>
                  a.datetime < b.datetime ? 1 : a.datetime > b.datetime ? -1 : 0
               )
               .slice(0, props.count)
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

export default connect(mapStateToProps)(LatestResultsGerman);

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
