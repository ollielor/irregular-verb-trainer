import React, { useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import {
   Body,
   Button,
   Card,
   CardItem,
   Content,
   Spinner,
   Text,
} from 'native-base'

import moment from 'moment'

import { useNavigation } from '@react-navigation/native'

import Heading from '../styling/Heading'

const ResultHistoryView = (props) => {
   const navigation = useNavigation()

   return (
      <Content>
         {!props.hideButton && <Heading>10 viimeisintä tulosta</Heading>}
         {props.resultHistory &&
            props.resultHistory
               .sort((a, b) =>
                  a.datetime < b.datetime ? 1 : a.datetime > b.datetime ? -1 : 0
               )
               .map((historyItem) => (
                  <Card key={historyItem.id}>
                     <CardItem header>
                        <Body>
                           <Text
                              style={{ color: '#7E00C5', fontWeight: 'bold' }}
                           >
                              {moment(historyItem.datetime).format(
                                 'DD.MM.YYYY HH:mm:ss'
                              )}
                           </Text>
                           <Text>
                              {historyItem.level === 1
                                 ? 'Taso 1'
                                 : historyItem.level === 2
                                 ? 'Taso 2'
                                 : 'Taso 3'}
                           </Text>
                           <Text>
                              Pisteet:{' '}
                              {historyItem.points.toFixed(2).replace('.', ',')}{' '}
                              / {historyItem.maxpoints} (
                              {historyItem.percentage
                                 .toFixed(2)
                                 .replace('.', ',')}{' '}
                              %)
                           </Text>
                           <Text>
                              Oikeita vastauksia: {historyItem.accuracy} /{' '}
                              {historyItem.q_total}
                           </Text>
                        </Body>
                     </CardItem>
                  </Card>
               ))}
         {!props.hideButton && (
            <Button
               onPress={() => navigation.navigate('Omat tulokseni (saksa)')}
               style={styles.historyButton}
            >
               <Text uppercase={false}>Näytä koko historia</Text>
            </Button>
         )}
      </Content>
   )
}

export default ResultHistoryView

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
})
