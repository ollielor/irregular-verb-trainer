import React, { useEffect, useState } from 'react';
import { Body, Card, CardItem, Content, Text } from 'native-base';
import { StyleSheet } from 'react-native';

import SpinnerComponent from '../styling/SpinnerComponent';

import { rndIntGenerator, rndIntGeneratorZero } from '../../helpers/helpers';
import ButtonMeanings from '../buttons/ButtonMeanings';

const CardComponentMeanings = (props) => {
   const [rndAlternativesLoaded, setRndAlternativesLoaded] = useState(false);
   const [correctMeaning, setCorrectMeaning] = useState('');
   const [correctInfinitive, setCorrectInfinitive] = useState('');
   const [randomizedAlternatives, setRandomizedAlternatives] = useState([]);
   const [correctIndex, setCorrectIndex] = useState(-1);
   const [incorrectIndex, setIncorrectIndex] = useState(-1);
   const [locked, setLocked] = useState(false);

   useEffect(() => {
      // Get one meaning of the three verbs set in MeaningsScreen
      const rndInt = rndIntGeneratorZero(3);
      setCorrectMeaning(props.alternatives[rndInt].meaning);
      setCorrectInfinitive(props.alternatives[rndInt].infinitive);
      let randomOrder = [];
      let randomOrderFinal = [];
      // Randomize alternatives
      while (randomOrderFinal.length < 3) {
         const rndIntAlternatives = rndIntGeneratorZero(3);
         randomOrder.push(rndIntAlternatives);
         // Check that same number doesn't occur twice or more
         if (randomOrder.length > 1) {
            randomOrderFinal = randomOrder.filter(
               (number, index, self) =>
                  index === self.findIndex((n) => n === number)
            );
         }
      }
      let newOrderArray = [];
      // Push the alternatives into a new array which is set to a state
      for (let i=0; i < randomOrderFinal.length; i++) {
         newOrderArray.push(props.alternatives[randomOrderFinal[i]]);
      }
     setRandomizedAlternatives(newOrderArray);
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
      <Content style={{overflow: 'visible'}}>
         {!rndAlternativesLoaded && (
            <SpinnerComponent text="Ladataan vaihtoehtoja" />
         )}
         {rndAlternativesLoaded && (
            <Card>
               <CardItem header style={{ backgroundColor: '#e8e8e8' }}>
                  <Body
                     style={styles.cardMeaningBody}
                  >
                     <Text style={styles.prompt}>{correctMeaning}</Text>
                  </Body>
               </CardItem>
               <CardItem style={styles.cardItem}>
                  <Body>
                     {randomizedAlternatives.map((alternative, index) => (
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
                     )
                     )}
                  </Body>
               </CardItem>
            </Card>
         )}
      </Content>
   );
};

export default CardComponentMeanings;

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
   cardMeaningBody: {
      flexDirection: 'row', 
      justifyContent: 'center' 
   },
   cardItem: { 
      backgroundColor: '#e8e8e8' 
   }
});
