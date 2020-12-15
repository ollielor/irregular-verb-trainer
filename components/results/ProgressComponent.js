import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Body, Card, CardItem, Content, Text } from 'native-base';

const ProgressComponent = (props) => {
   
   const [totalCorrectAnswers, setTotalCorrectAnswers] = useState(0);
   const [totalQuestions, setTotalQuestions] = useState(0);
   const [totalPercentage, setTotalPercentage] = useState(0);
   const [totalAttempts, setTotalAttempts] = useState(0);

   console.log('ProgressComponent: ', props.data)

   useEffect(() => {
      const correctAnswers = props.data.map(result => result.accuracy);
      setTotalCorrectAnswers(correctAnswers.reduce((a, b) => a + b));
      const questions = props.data.map(result => result.q_total);
      setTotalQuestions(questions.reduce((a, b) => a + b));
      const percentages = props.data.map(result => result.percentage);
      console.log('Percentages: ', percentages)
      const percentagesAverage = percentages.reduce((a, b) => a + b) / percentages.length;
      setTotalPercentage(percentagesAverage); 
   }, [props.data, props.forms])

   return (
      <Content>
         <Card>
            <CardItem style={totalPercentage > 77.5 ? styles.progressCardStyleGood : styles.progressCardStyleNeutral}>
               <Body style={styles.progressBodyStyle}>
                  <Text style={styles.progressStyle}>
                     Oikeita vastauksia: {totalCorrectAnswers} / {totalQuestions}
                  </Text>
                  <Text style={styles.progressStyle}>
                     Osaamisprosentti: {totalPercentage.toFixed(2).replace('.', ',')}{' '}% 
                  </Text>
                  <Text style={styles.progressStyle}>
                     (sisältää aikabonukset)
                  </Text>
               </Body>
            </CardItem>
         </Card>
      </Content>
   );
}

export default ProgressComponent;

const styles = StyleSheet.create({
   progressCardStyleNeutral: {
      backgroundColor: '#e8e8e8'
   },
   progressCardStyleGood: {
      backgroundColor: '#a3dc59'
   },
   progressBodyStyle: {
      justifyContent: 'center', 
      alignItems: 'center'
   },
   progressStyle: {
      color: '#4E00C5',
      textAlign: 'center',
      fontWeight: 'bold'
   }
})