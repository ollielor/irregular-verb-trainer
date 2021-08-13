import React, { useState, useEffect } from 'react';
import { Button, Text } from 'native-base';

import { styles } from '../../styles/styles';

const ButtonMeanings = (props) => {
   const [correct, setCorrect] = useState(false);
   const [incorrect, setIncorrect] = useState(false);

   useEffect(() => {
      if (props.correctIndex === props.index) {
         setCorrect(true);
      }
      if (props.incorrectIndex === props.index) {
         setIncorrect(true);
      }
   }, [props.locked]);

   return (
      <Button
         full
         onPress={() =>
            props.evaluateAnswers(
               props.alternative.meaning,
               props.index,
               props.alternative.infinitive
            )
         }
         disabled={props.locked}
         style={
            (props.locked && correct) ||
            (props.locked && props.alternative.meaning === props.correctMeaning)
               ? [
                    styles(props).meaningsButtonStyle,
                    styles(props).meaningsCorrectAnswer,
                 ]
               : props.locked && incorrect
               ? [
                    styles(props).meaningsButtonStyle,
                    styles(props).meaningsIncorrectAnswer,
                 ]
               : styles(props).meaningsButtonStyle
         }
      >
         <Text uppercase={false}>{props.alternative.infinitive}</Text>
      </Button>
   );
};

export default ButtonMeanings;
