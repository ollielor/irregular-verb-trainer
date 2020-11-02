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
   const [correctMeaning, setCorrectMeaning] = useState('');
   const [randomizedAlternatives, setRandomizedAlternatives] = useState([]);

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
      console.log(randomOrderFinal);
      let newOrderArray = [];
      for (let i=0; i < randomOrderFinal.length; i++) {
         newOrderArray.push(props.alternatives[randomOrderFinal[i]])
      }
      setRandomizedAlternatives(newOrderArray);
   }, [])

    const evaluate = meaning => {
      if (meaning === correctMeaning) {
         setCorrect(true);
      }
   }

    return (
      <Content>
         <Card>
            <CardItem header>
               <Text>
                  {correctMeaning}
               </Text>
            </CardItem>
            {randomizedAlternatives.map(alternative =>
               <CardItem>
                  <Button onPress={() => {}} style={styles.correctAnswer}>
                     <Text uppercase={false}>
                        {alternative.infinitive}
                     </Text>
                  </Button>
                </CardItem>
            )}
         </Card>
      </Content>
    );
}

export default MeaningCardComponent;

const styles = StyleSheet.create({
   correctAnswer: {
      backgroundColor: 'green'
   }
});
