import React, { useEffect, useState } from 'react';
import {
   Body, 
   Button,
   Card,
   CardItem,
   Content,
   Text,
} from 'native-base';
import { StyleSheet } from 'react-native';

const MeaningCardComponent = props => {

   console.log(props);

   console.log(props.alternatives);

   const [correct, setCorrect] = useState(false);
   const [incorrect, setIncorrect] = useState(false);
   const [rndAlternativesLoaded, setRndAlternativesLoaded] = useState(false);
   const [correctMeaning, setCorrectMeaning] = useState('');
   const [randomizedAlternatives, setRandomizedAlternatives] = useState([]);
   const [correctIndex, setCorrectIndex] = useState(-1);
   const [incorrectIndex, setIncorrectIndex] = useState(-1);

   const getRndInteger = () => {
      return Math.floor(Math.random() * 3);
   }

   useEffect(() => {
      const rndInt = getRndInteger();
      setCorrectMeaning(props.alternatives[rndInt].meaning);
      let randomOrder = [];
      let randomOrderFinal = [];
      while (randomOrderFinal.length < 3) {
         const rndIntAlternatives = getRndInteger();
         randomOrder.push(rndIntAlternatives);
         if (randomOrder.length > 1) {
            randomOrderFinal = randomOrder.filter((number, index, self) => index === self.findIndex((n) => (
               n === number
            ))
            )
         }
      }
      let newOrderArray = [];
      for (let i=0; i < randomOrderFinal.length; i++) {
         newOrderArray.push(props.alternatives[randomOrderFinal[i]])
      }
      setRandomizedAlternatives(newOrderArray);
      setRndAlternativesLoaded(true);
   }, [])

    const evaluate = (meaning, index) => {
      if (meaning === correctMeaning) {
         setCorrect(true);
         setCorrectIndex(index);
      } else {
         setIncorrect(true);
         setIncorrectIndex(index);
      }
   }

    return (
       <Content>
         {!rndAlternativesLoaded && 
               <Text>
                  Ladataan vaihtoehtoja...
               </Text>

         }
         {rndAlternativesLoaded &&
               <Card>
                  <CardItem header>
                     <Text>
                        {correctMeaning}
                     </Text>
                  </CardItem>
                  <CardItem>
                        <Button onPress={() => evaluate(randomizedAlternatives[0].meaning, 0)} disabled={correct || incorrect} style={[
                              correct && correctIndex === 0 ? styles.correctAnswer : incorrect && incorrectIndex === 0 ? styles.incorrectAnswer : styles.notAnswered
                           ]}>
                           <Text uppercase={false}>
                              {randomizedAlternatives[0].infinitive}
                           </Text>
                        </Button>
                        <Button onPress={() => evaluate(randomizedAlternatives[1].meaning, 1)} disabled={correct || incorrect} style={[
                              correct && correctIndex === 1 ? styles.correctAnswer : incorrect && incorrectIndex === 1 ? styles.incorrectAnswer : styles.notAnswered
                           ]}>
                           <Text uppercase={false}>
                              {randomizedAlternatives[1].infinitive}
                           </Text>
                        </Button>
                        <Button onPress={() => evaluate(randomizedAlternatives[2].meaning, 2)} disabled={correct || incorrect} style={[
                              correct && correctIndex === 2 ? styles.correctAnswer : incorrect && incorrectIndex === 2 ? styles.incorrectAnswer : styles.notAnswered
                           ]}>
                           <Text uppercase={false}>
                              {randomizedAlternatives[2].infinitive}
                           </Text>
                        </Button>
                     </CardItem>
               </Card>
         }
      </Content>
    );
}

export default MeaningCardComponent;

const styles = StyleSheet.create({
   notAnswered: {
      backgroundColor: '#0000cc',
      marginRight: 5
   },
   correctAnswer: {
      backgroundColor: '#006600',
      marginRight: 5
   },
   incorrectAnswer: {
      backgroundColor: '#cc0000',
      marginRight: 5
   }
});
