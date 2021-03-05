import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Text } from 'native-base';

const MeaningsButton = (props) => {

      const [correct, setCorrect] = useState(false);
      const [incorrect, setIncorrect] = useState(false);

      useEffect(() => {
         if (props.correctIndex === props.index) {
            setCorrect(true);
         }
         if (props.incorrectIndex === props.index) {
            setIncorrect(true);
         }
      }, [props.locked])

      return (
         <Button
            full
            onPress={() =>
               props.evaluateAnswers(props.alternative.meaning, props.index)
            }
            disabled={props.locked}
            style={
               props.locked && correct || props.locked && props.alternative.meaning === props.correctMeaning ? [styles.answerButtonStyle, styles.correctAnswer] 
               : props.locked && incorrect ? [styles.answerButtonStyle, styles.incorrectAnswer]
               : styles.answerButtonStyle
            }
         >
            <Text uppercase={false}>
               {props.alternative.infinitive}
            </Text>
         </Button>
      )
}

export default MeaningsButton;

const styles = StyleSheet.create({
   prompt: {
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
   },
   answerButtonStyle: {
      marginBottom: 5,
      backgroundColor: '#0000cc',
   },
   correctAnswer: {
      backgroundColor: '#006600',
   },
   incorrectAnswer: {
      backgroundColor: '#cc0000',
   },
});