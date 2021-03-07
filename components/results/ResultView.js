import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Content, Text } from 'native-base';
import feedbackTexts from '../../feedback/feedback.json';

import { connect } from 'react-redux';

import { rndIntGenerator } from '../../helpers/helpers';

const ResultView = (props) => {

   const [feedback, setFeedback] = useState('');

   console.log(feedbackTexts);

   useEffect(() => {
      if (props.results.totalPercentage > 87.5) {
         setFeedback(feedbackTexts[props.language].high[rndIntGenerator(feedbackTexts[props.language].high.length)].text)
      } else if (props.results.totalPercentage > 77.5) {
         setFeedback(feedbackTexts[props.language].good[rndIntGenerator(feedbackTexts[props.language].good.length)].text)
      } else {
         setFeedback(feedbackTexts[props.language].low[rndIntGenerator(feedbackTexts[props.language].low.length)].text)
      }
   }, []);

   return (
      <Content>
         <Text style={styles.feedback}>
            {feedback}
         </Text>
         <Text style={styles.feedbackPoints}>
            Sait {props.results.totalPoints && props.results.totalPoints.toFixed(2).replace('.', ',')} /{' '}
            {props.results.maxPointsWeighted
               ? props.results.maxPointsWeighted
               : props.results.maxPoints}{' '}
            pistettä eli{' '}
            {props.results.totalPercentage && props.results.totalPercentage
               .toFixed(2)
               .toString()
               .replace('.', ',')}{' '}
            % maksimista.
         </Text>
         <Text style={styles.feedbackPoints}>
            Oikeita vastauksia: {props.results.amountCorrectAnswers} /{' '}
            {props.results.totalAnswered || props.results.maxQuestions}
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
