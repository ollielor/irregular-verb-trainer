import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { 
   Button,
   Container,
   Content,
   Text
} from 'native-base';

const GermanResultScreen = props => {

   return (
      <>
         <Text style={styles.finished}>
            {props.results.totalRatio > 87.5 ? 'Super!' :
               props.results.totalRatio > 77.5 ? 'Gut!' :
               'Du musst noch üben!'
            }
            Sait {props.results.totalPoints} / {props.results.maxPointsWeighted} pistettä eli {props.results.totalRatio} % maksimista.
            Oikeita vastauksia: {props.results.amountCorrectAnswers} / {props.results.totalAnswered}
         </Text>
         <Button onPress={() => props.startAgain()}>
            <Text>
               Aloita uudestaan
            </Text>
         </Button>
      </>
   )
}

export default GermanResultScreen;

const styles = StyleSheet.create({
   container: {
     backgroundColor: '#d2d2d2',
   },
   contentContainer: {
      padding: 10
   },
   });
 