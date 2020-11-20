import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { 
   Body,
   Button,
   Card,
   CardItem,
   Content,
   Text
} from 'native-base';

import moment from 'moment';

import { useNavigation } from '@react-navigation/native';

import Heading from './Heading';

const ResultHistoryView = props => {

   const navigation = useNavigation();

   return (
      <Content>
         {!props.hideButton &&
            <Heading>
               10 viimeisintä tulosta
            </Heading>
         }
         {props.resultHistory
            .filter(historyItem => historyItem.datetime)
            .sort((a, b) => a.datetime < b.datetime ? 1 : a.datetime > b.datetime ? -1 : 0)
            .filter((historyItem, index) => index < 10)
            .map((historyItem, index) => 
               <Card key={index}>
                  <CardItem header>
                     <Body>
                        <Text style={{color: '#7E00C5', fontWeight: 'bold'}}>
                           {moment(historyItem.datetime).format('DD.MM.YYYY HH:mm')}
                        </Text>
                        <Text>
                           Taso: {historyItem.level === 1 ? 'Perustason verbit' : historyItem.level === 2 ? 'Keskitason verbit' : 'Haastavat verbit'}
                        </Text>
                        <Text>
                           Pisteet: {historyItem.points} / {historyItem.maxpoints} ({historyItem.percentage.toFixed(2).replace('.', ',')} %)
                        </Text>
                        <Text>
                           Oikeita vastauksia: {historyItem.accuracy} / {historyItem.q_total}
                        </Text>
                     </Body>
                  </CardItem>
               </Card>
         )}
         {!props.hideButton && 
            <Button onPress={() => navigation.navigate('Omat tulokseni (saksa)')} style={styles.historyButton}>
               <Text uppercase={false}>
                  Näytä koko historia
               </Text>
            </Button>
         }
      </Content>
   )
}

export default ResultHistoryView;

const styles = StyleSheet.create({
   header: {
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 24,
      color: '#4E00C5',
      marginTop: 20
   },
   historyButton: {
      backgroundColor: '#4E00C5',
      alignSelf: 'center',
      marginTop: 20,
      marginBottom: 20
   }
});
 