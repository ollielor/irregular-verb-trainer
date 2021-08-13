import React from 'react';
import { Body, Card, CardItem, Text } from 'native-base';
import { StyleSheet } from 'react-native';
import MasteryTextComponent from '../styling/MasteryTextComponent';

import { styles } from '../../styles/styles';

const CardComponentMastery = (props) => {
   return (
      <Card>
         <CardItem
            header
            style={
               props.mastered
                  ? styles(props).mastered
                  : styles(props).notMastered
            }
         >
            <Text
               style={
                  props.notMastered
                     ? styles(props).notMasteredText
                     : styles(props).masteredText
               }
            >
               {props.mastered && 'Nämä osaat jo:'}
               {props.notMastered && 'Kertaa vielä näitä:'}
            </Text>
         </CardItem>
         <CardItem>
            <Body>
               {props.mastered &&
                  props.mastered.map((item, index) => (
                     <MasteryTextComponent
                        key={index}
                        infinitive={item.infinitive}
                        meaning={item.meaning}
                     />
                  ))}
               {props.notMastered &&
                  props.notMastered.map((item, index) => (
                     <MasteryTextComponent
                        key={index}
                        infinitive={item.infinitive}
                        meaning={item.meaning}
                        wrongAnswer={item.wrongAnswer}
                     />
                  ))}
            </Body>
         </CardItem>
      </Card>
   );
};

export default CardComponentMastery;
