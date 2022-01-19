import React, { useEffect, useState } from 'react';
import { Box, VStack, Stack, Text } from 'native-base';

import SpinnerComponent from '../styling/SpinnerComponent';

import { getRandomizedAlternatives } from '../../helpers/helpers';
import ButtonMeanings from '../buttons/ButtonMeanings';

import { styles } from '../../styles/styles';

const CardComponentMeanings = (props) => {
   const [rndAlternativesLoaded, setRndAlternativesLoaded] = useState(false);
   const [correctMeaning, setCorrectMeaning] = useState('');
   const [correctInfinitive, setCorrectInfinitive] = useState('');
   const [randomizedAlternatives, setRandomizedAlternatives] = useState([]);
   const [correctIndex, setCorrectIndex] = useState(-1);
   const [incorrectIndex, setIncorrectIndex] = useState(-1);
   const [locked, setLocked] = useState(false);

   useEffect(() => {
      setRndAlternativesLoaded(false);
      // Get one meaning of the three verbs set in MeaningsScreen
      // const rndInt = getRandomInt(0);
      setCorrectMeaning(props.alternatives[0].meaning);
      setCorrectInfinitive(props.alternatives[0].infinitive);
/*       let newOrderArray = [];
      // Push the alternatives into a new array which is set to a state
      for (let i = 0; i < randomOrderFinal.length; i++) {
         newOrderArray = [...]
      } */
      let randomizedIntsArray = [];
      let randomizedVerbs = [];
      randomizedIntsArray = getRandomizedAlternatives();
      randomizedVerbs = randomizedIntsArray.map((rndInt) => props.alternatives[rndInt]);
      setRandomizedAlternatives(randomizedVerbs);
      setRndAlternativesLoaded(true);
   }, [props.started]);

   const evaluateAnswers = (meaning, index, infinitive) => {
      if (meaning === correctMeaning) {
         setCorrectIndex(index);
         props.evaluate(true, correctMeaning, correctInfinitive, infinitive);
         setLocked(true);
      } else {
         setIncorrectIndex(index);
         props.evaluate(false, correctMeaning, correctInfinitive, infinitive);
         setLocked(true);
      }
   };

   return (
      <Box style={styles(props).overFlowVisible} pt='4'>
         {rndAlternativesLoaded ? (
            <Stack direction='column'>
               <VStack style={styles(props).cardMeaningBody}>
                  <Text style={styles(props).promptMeanings}>
                     {correctMeaning}
                  </Text>
               </VStack>
               <VStack style={styles(props).cardComponentGrey}>
                  {randomizedAlternatives.map((alternative, index) => (
                     <VStack key={index}>
                        <ButtonMeanings
                           key={index}
                           alternative={alternative}
                           evaluateAnswers={evaluateAnswers}
                           index={index}
                           locked={locked}
                           correctMeaning={correctMeaning}
                           correctIndex={correctIndex}
                           incorrectIndex={incorrectIndex}
                        />
                     </VStack>
                  ))}
               </VStack>
            </Stack>
         ) :
         (
            <SpinnerComponent text="Ladataan vaihtoehtoja..." />
         )
         }
      </Box>
   );
};

export default CardComponentMeanings;
