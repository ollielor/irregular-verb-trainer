import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Body, Card, CardItem, Content, Text } from 'native-base';

import { connect } from 'react-redux';

const ProgressComponent = (props) => {
   const [totalCorrectAnswers, setTotalCorrectAnswers] = useState(0);
   const [totalQuestions, setTotalQuestions] = useState(0);
   const [totalPercentage, setTotalPercentage] = useState(0);
   const [totalAttempts, setTotalAttempts] = useState(0);

   console.log('Props from ProgressComponent: ', props);

   useEffect(() => {
      console.log('Props.results.length: ', props.results.length)
      if (props.results.length > 0) {
         console.log('props.results ', props.results)
         console.log('props.historyLevel ', props.historyLevel)
         console.log('props.type: ', props.type)
         const resultsFilteredByLevel = props.results.filter(
            (result) => result.level === props.historyLevel); 
            //(result) => result.level === props.historyLevel && result.type === props.type);
         const resultsFiltered = resultsFilteredByLevel.filter((result) => result.type === props.type);
         console.log('resultsFiltered: ', resultsFiltered);
         const correctAnswers = resultsFiltered.map((result) => result.accuracy);
         if (correctAnswers.length > 0) {
            setTotalCorrectAnswers(correctAnswers.reduce((a, b) => a + b));
         }         
         console.log('totalCorrectAnswers: ', totalCorrectAnswers);
         const questions = resultsFiltered.map((result) => result.q_total);
         if (questions.length > 0) {
            setTotalQuestions(questions.reduce((a, b) => a + b));
         }
         const percentages = resultsFiltered.map((result) => result.percentage);
         console.log('Percentages: ', percentages);
         if (percentages.length > 0) {
            const percentagesAverage = percentages.reduce((a, b) => a + b) / percentages.length;
         setTotalPercentage(percentagesAverage);
         }
      }
   }, [props.results]);

   return (
      <Content>
         <Card>
            <CardItem
               style={
                  totalPercentage > 77.5
                     ? styles.progressCardStyleGood
                     : styles.progressCardStyleNeutral
               }
            >
                  <Body style={styles.progressBodyStyle}>
                     <Text style={styles.progressStyle}>
                        Oikeita vastauksia: {totalCorrectAnswers} /{' '}
                        {totalQuestions}
                     </Text>
                     <Text style={styles.progressStyle}>
                        Osaamisprosentti:{' '}
                        {totalPercentage && totalPercentage.toFixed(2).replace('.', ',')} %
                     </Text>
                     <Text style={styles.progressStyle}>
                        (sisältää aikabonukset)
                     </Text>
                  </Body>
            </CardItem>
         </Card>
      </Content>
   );
};

const mapStateToProps = (state) => ({
   language: state.settings.language,
   results: state.results.results
});

export default connect(mapStateToProps)(ProgressComponent);

const styles = StyleSheet.create({
   progressCardStyleNeutral: {
      backgroundColor: '#e8e8e8',
   },
   progressCardStyleGood: {
      backgroundColor: '#a3dc59',
   },
   progressBodyStyle: {
      justifyContent: 'center',
      alignItems: 'center',
   },
   progressStyle: {
      color: '#4E00C5',
      textAlign: 'center',
      fontWeight: 'bold',
   },
});
