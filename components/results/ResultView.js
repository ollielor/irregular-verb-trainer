import React, { useState, useEffect } from 'react';
import { Button, Box, Text } from 'native-base';
import feedbackTexts from '../../feedback/feedback.json';

import { connect } from 'react-redux';

import { rndIntGeneratorZero } from '../../helpers/helpers';

import { styles } from '../../styles/styles';
import ButtonComponent from '../buttons/ButtonComponent';
import ButtonComponentNarrow from '../buttons/ButtonComponentNarrow';

const ResultView = (props) => {
   const [feedback, setFeedback] = useState('');

   console.log('totalPercentage ', props.resultsData.totalPercentage);

   useEffect(() => {
      if (props.resultsData.totalPercentage >= 87.5) {
         setFeedback(
            feedbackTexts[props.language].high[
               rndIntGeneratorZero(feedbackTexts[props.language].high.length)
            ].text
         );
      } else if (props.resultsData.totalPercentage >= 77.5) {
         setFeedback(
            feedbackTexts[props.language].good[
               rndIntGeneratorZero(feedbackTexts[props.language].good.length)
            ].text
         );
      } else {
         setFeedback(
            feedbackTexts[props.language].low[
               rndIntGeneratorZero(feedbackTexts[props.language].low.length)
            ].text
         );
      }
   }, [props.resultsData]);

   return (
      <Box style={styles(props).containerSilver} shadow='5'>
         <Text style={styles(props).feedback}>
            {feedback}
         </Text>
         <Text style={styles(props).feedbackPoints}>
            Sait{' '}
            {props.resultsData.totalPoints &&
               props.resultsData.totalPoints.toFixed(2).replace('.', ',')}{' '}
            /{' '}
            {props.resultsData.maxPointsWeighted
               ? props.resultsData.maxPointsWeighted
               : props.resultsData.maxPoints}{' '}
            pistettä eli{' '}
            {props.resultsData.totalPercentage &&
               props.resultsData.totalPercentage
                  .toFixed(2)
                  .toString()
                  .replace('.', ',')}{' '}
            % maksimista.
         </Text>
         {props.resultsData.totalPoints - props.resultsData.points > 0 ? (
            <Text style={styles(props).feedbackPoints}>
               Aikabonuksesi:{' '}
               {(props.resultsData.totalPoints - props.resultsData.points)
                  .toFixed(2)
                  .replace('.', ',')}{' '}
               pistettä
            </Text>
         ) : (
            props.resultsData.totalPoints - props.resultsData.points < 0 && (
               <Text style={styles(props).feedbackPoints}>
                  Aikavähennyksesi:{' '}
                  {(props.resultsData.totalPoints - props.resultsData.points)
                     .toFixed(2)
                     .replace('.', ',')}{' '}
                  pistettä
               </Text>
            )
         )}
         <Text style={styles(props).feedbackPoints}>
            Oikeita vastauksia: {props.resultsData.numberCorrectAnswers} /{' '}
            {props.resultsData.totalAnswered || props.resultsData.maxQuestions}
         </Text>
         <Text style={styles(props).feedbackPoints}>
            Katso oikeat vastaukset alta.
         </Text>
         <ButtonComponentNarrow
            mt='5'
            function={props.startAgain}
            title='Aloita uudelleen'
         />
      </Box>
   );
};

const mapStateToProps = (state) => ({
   language: state.settings.language,
   results: state.results.results,
});

export default connect(mapStateToProps)(ResultView);
