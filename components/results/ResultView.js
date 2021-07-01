import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Content, Text } from 'native-base';
import feedbackTexts from '../../feedback/feedback.json';

import { connect } from 'react-redux';

import { rndIntGeneratorZero } from '../../helpers/helpers';

const ResultView = (props) => {

   const [feedback, setFeedback] = useState('');

   console.log(feedbackTexts);

   useEffect(() => {
      if (props.resultsData.totalPercentage > 87.5) {
         setFeedback(feedbackTexts[props.language].high[rndIntGeneratorZero(feedbackTexts[props.language].high.length)].text)
      } else if (props.resultsData.totalPercentage > 77.5) {
         setFeedback(feedbackTexts[props.language].good[rndIntGeneratorZero(feedbackTexts[props.language].good.length)].text)
      } else {
         setFeedback(feedbackTexts[props.language].low[rndIntGeneratorZero(feedbackTexts[props.language].low.length)].text)
      }
   }, []);

   return (
      <Content>
         <Text style={styles.feedback}>
            {feedback}
         </Text>
         <Text style={styles.feedbackPoints}>
            Sait {props.resultsData.totalPoints && props.resultsData.totalPoints.toFixed(2).replace('.', ',')} /{' '}
            {props.resultsData.maxPointsWeighted
               ? props.resultsData.maxPointsWeighted
               : props.resultsData.maxPoints}{' '}
            pistettä eli{' '}
            {props.resultsData.totalPercentage && props.resultsData.totalPercentage
               .toFixed(2)
               .toString()
               .replace('.', ',')}{' '}
            % maksimista.
         </Text>
         <Text style={styles.feedbackPoints}>
            Oikeita vastauksia: {props.resultsData.amountCorrectAnswers} /{' '}
            {props.resultsData.totalAnswered || props.resultsData.maxQuestions}
         </Text>
         <Text style={styles.feedbackPoints}>
               Katso oikeat vastaukset alta.
         </Text>
         <Button style={styles.startAgainButton} onPress={props.startAgain}>
            <Text uppercase={false}>Aloita uudestaan</Text>
         </Button>
      </Content>
   );
};

const mapStateToProps = (state) => ({
   language: state.settings.language,
   results: state.results.results
});

export default connect(mapStateToProps)(ResultView);

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
