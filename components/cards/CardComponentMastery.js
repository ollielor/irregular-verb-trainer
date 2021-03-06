import React from 'react';
import { Body, Card, CardItem, Text } from 'native-base';
import { StyleSheet } from 'react-native';
import MasteryTextComponent from '../styling/MasteryTextComponent';

const CardComponentMastery = (props) => {

   return (
         <Card>
            <CardItem header style={
                  props.mastered ? styles.mastered : styles.notMastered
               }
            >
               <Text style={
                  props.notMastered ? styles.notMasteredText : styles.masteredText
               }>               
                  {props.mastered && 'Nämä osaat jo:'}
                  {props.notMastered && 'Kertaa vielä näitä:'}
               </Text>
            </CardItem>
            <CardItem>
               <Body>
                  {props.mastered && props.mastered.map((item, index) =>
                     <MasteryTextComponent 
                        key={index}
                        infinitive={item.infinitive} 
                        meaning={item.meaning}
                     />
                  )}
                  {props.notMastered && props.notMastered.map((item, index) =>
                     <MasteryTextComponent 
                        key={index}
                        infinitive={item.infinitive} 
                        meaning={item.meaning}
                        wrongAnswer={item.wrongAnswer}
                     />
                  )}
               </Body>
            </CardItem>
         </Card>
      );
   };

export default CardComponentMastery;

const styles = StyleSheet.create({
   mastered: {
      backgroundColor: '#66dd33',
   },
   notMastered: {
      backgroundColor: '#ff0033',
   },
   masteredText: {
      color: '#4E00C5'
   },
   notMasteredText: {
      color: '#fff'
   },
})