import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Text } from 'native-base';
import { useEffect } from 'react/cjs/react.development';

const MeaningsButton = (props) => {

      const [correct, setCorrect] = useState(false);
      const [incorrect, setIncorrect] = useState(false);

      console.log(props);

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
      onPress={() =>
         props.evaluateAnswers(props.alternative.meaning, props.index)
      }
      disabled={props.locked}
      style={[
         props.locked && correct || props.locked && props.alternative.meaning === props.correctMeaning
            ? styles.correctAnswer
            : props.locked && incorrect
            ? styles.incorrectAnswer
            : styles.notAnswered,
      ]}
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
   notAnswered: {
      backgroundColor: '#0000cc',
      marginLeft: 2,
      marginRight: 2,
   },
   correctAnswer: {
      backgroundColor: '#006600',
      marginLeft: 2,
      marginRight: 2,
   },
   incorrectAnswer: {
      backgroundColor: '#cc0000',
      marginLeft: 2,
      marginRight: 2,
   },
});