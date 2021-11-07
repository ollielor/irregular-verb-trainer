import React, { useState, useEffect } from 'react';
import { Box, VStack, Text } from 'native-base';

import { connect } from 'react-redux';

import { styles } from '../../styles/styles';

const ProgressComponent = (props) => {
   const [totalCorrectAnswers, setTotalCorrectAnswers] = useState(0);
   const [totalQuestions, setTotalQuestions] = useState(0);
   const [totalPercentage, setTotalPercentage] = useState(0);

   useEffect(() => {
      if (props.resultsDropped) {
         setTotalCorrectAnswers(0);
         setTotalQuestions(0);
         setTotalPercentage(0);
      } 
      if (props.results.length > 0) {
         const resultsFilteredByLevel = props.results.filter(
            (result) => result.level === props.historyLevel
         );
         const resultsFiltered = resultsFilteredByLevel.filter(
            (result) => result.type === props.type
         );
         const correctAnswers = resultsFiltered.map(
            (result) => result.accuracy
         );
         if (correctAnswers.length > 0) {
            setTotalCorrectAnswers(correctAnswers.reduce((a, b) => a + b));
         }
         const questions = resultsFiltered.map((result) => result.q_total);
         if (questions.length > 0) {
            setTotalQuestions(questions.reduce((a, b) => a + b));
         }
         const percentages = resultsFiltered.map((result) => result.percentage);
         if (percentages.length > 0) {
            const percentagesAverage =
               percentages.reduce((a, b) => a + b) / percentages.length;
            setTotalPercentage(percentagesAverage);
         }
      }
   }, [props.results, props.resultsDropped]);

   return (
      <Box>
         <VStack>
            <Box
               p='2'
               mb='3'
               style={
                  totalPercentage >= 77.5
                     ? styles(props).progressCardStyleGood
                     : styles(props).progressCardStyleNeutral
               }
            >
                  <Text style={styles(props).progressStyle}>
                     Oikeita vastauksia: {totalCorrectAnswers} /{' '}
                     {totalQuestions}
                  </Text>
                  <Text style={styles(props).progressStyle}>
                     Osaamisprosentti:{' '}
                     {totalPercentage &&
                        totalPercentage.toFixed(2).replace('.', ',')}{' '}
                     %
                  </Text>
                  <Text style={styles(props).progressStyle}>
                     (sisältää aikabonukset ja -vähennykset)
                  </Text>
            </Box>
         </VStack>
      </Box>
   );
};

const mapStateToProps = (state) => ({
   language: state.settings.language,
   results: state.results.results,
});

export default connect(mapStateToProps)(ProgressComponent);
