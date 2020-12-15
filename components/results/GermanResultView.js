import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Container, Content, Text } from 'native-base';

const GermanResultView = (props) => {
   return (
      <Content>
         <Text style={styles.feedback}>
            {props.results.totalPercentage > 87.5
               ? 'Super!'
               : props.results.totalPercentage > 77.5
               ? 'Gut!'
               : 'Du musst noch üben!'}
         </Text>
         <Text style={styles.feedbackPoints}>
            Sait {props.results.totalPoints.toFixed(2).replace('.', ',')} /{' '}
            {props.results.maxPointsWeighted
               ? props.results.maxPointsWeighted
               : props.results.maxPoints}{' '}
            pistettä eli{' '}
            {props.results.totalPercentage
               .toFixed(2)
               .toString()
               .replace('.', ',')}{' '}
            % maksimista.
         </Text>
         <Text style={styles.feedbackPoints}>
            Oikeita vastauksia: {props.results.amountCorrectAnswers} /{' '}
            {props.results.totalAnswered || props.results.maxQuestions}
         </Text>
         {props.forms && (
            <Text style={styles.feedbackPoints}>
               Katso oikeat vastaukset alta.
            </Text>
         )}
         <Button style={styles.startAgainButton} onPress={props.startAgain}>
            <Text uppercase={false}>Aloita uudestaan</Text>
         </Button>
      </Content>
   );
};

export default GermanResultView;

const styles = StyleSheet.create({
   feedback: {
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 24,
      color: '#4E00C5',
      marginTop: 20,
   },
   feedbackPoints: {
      textAlign: 'center',
      paddingTop: 10,
   },
   startAgainButton: {
      backgroundColor: '#4E00C5',
      alignSelf: 'center',
      marginTop: 20,
      marginBottom: 20,
   },
});
