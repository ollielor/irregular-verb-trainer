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
         w='100%'
         p='5'
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
                    styles(props).meaningsButtonDefault,
                    styles(props).meaningsCorrectAnswer,
                 ]
               : props.locked && incorrect
               ? [
                    styles(props).meaningsButtonDefault,
                    styles(props).meaningsIncorrectAnswer,
                 ]
               : styles(props).meaningsButtonDefault
         }
      >
         <Text style={styles(props).textAlternative} uppercase={false}>{props.alternative.infinitive}</Text>
      </Button>
   );
};

export default ButtonMeanings;
