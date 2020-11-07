import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { 
   Button,
   Container,
   Content,
   Text
} from 'native-base';

const GermanResultView = props => {

   return (
      <Content>
         <Text style={styles.feedback}>
            {props.results.totalRatio > 87.5 ? 'Super!' :
               props.results.totalRatio > 77.5 ? 'Gut!' :
               'Du musst noch üben!'
            }
         </Text>
         <Text style={styles.feedbackPoints}>
            Sait {props.results.totalPoints} / {props.results.maxPointsWeighted} pistettä eli {props.results.totalRatioRounded} % maksimista.
            Oikeita vastauksia: {props.results.amountCorrectAnswers} / {props.results.totalAnswered}
         </Text>
         <Button style={styles.startAgainButton} onPress={() => props.startAgain()}>
            <Text uppercase={false}>
               Aloita uudestaan
            </Text>
         </Button>
      </Content>
   )
}

export default GermanResultView;

const styles = StyleSheet.create({
   feedback: {
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 24,
      color: '#4E00C5',
      marginTop: 20
   },
   feedbackPoints: {
      textAlign: 'center',
      paddingTop: 10
   },
   startAgainButton: {
      backgroundColor: '#4E00C5',
      alignSelf: 'center',
      marginTop: 20
   }
   });
 