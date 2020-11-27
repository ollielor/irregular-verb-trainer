import React, { useEffect, useState } from 'react'
import { Button, Card, CardItem, Content, Text } from 'native-base'
import { StyleSheet } from 'react-native'

import { rndIntGenerator } from '../helpers/helpers'

const CardComponentMeanings = (props) => {
   const [correct, setCorrect] = useState(false)
   const [incorrect, setIncorrect] = useState(false)
   const [rndAlternativesLoaded, setRndAlternativesLoaded] = useState(false)
   const [correctMeaning, setCorrectMeaning] = useState('')
   const [randomizedAlternatives, setRandomizedAlternatives] = useState([])
   const [correctIndex, setCorrectIndex] = useState(-1)
   const [incorrectIndex, setIncorrectIndex] = useState(-1)

   useEffect(() => {
      // Get one meaning of the three verbs set in GermanMeaningsScreen
      const rndInt = rndIntGenerator(3)
      setCorrectMeaning(props.alternatives[rndInt].meaning)
      let randomOrder = []
      let randomOrderFinal = []
      // Randomize alternatives
      while (randomOrderFinal.length < 3) {
         const rndIntAlternatives = rndIntGenerator(3)
         randomOrder.push(rndIntAlternatives)
         // Check that same number doesn't occur twice or more
         if (randomOrder.length > 1) {
            randomOrderFinal = randomOrder.filter(
               (number, index, self) =>
                  index === self.findIndex((n) => n === number)
            )
         }
      }
      let newOrderArray = []
      // Push the alternatives into a new array which is set to a state
      for (let i = 0; i < randomOrderFinal.length; i++) {
         newOrderArray.push(props.alternatives[randomOrderFinal[i]])
      }
      setRandomizedAlternatives(newOrderArray)
      setRndAlternativesLoaded(true)
   }, [])

   const evaluateAnswers = (meaning, index) => {
      if (meaning === correctMeaning) {
         setCorrect(true)
         setCorrectIndex(index)
         props.evaluate(true)
      } else {
         setIncorrect(true)
         setIncorrectIndex(index)
         props.evaluate(false)
      }
   }

   return (
      <Content>
         {!rndAlternativesLoaded && <Text>Ladataan vaihtoehtoja...</Text>}
         {rndAlternativesLoaded && (
            <Card>
               <CardItem header>
                  <Text>{correctMeaning}</Text>
               </CardItem>
               <CardItem>
                  <Button
                     onPress={() =>
                        evaluateAnswers(randomizedAlternatives[0].meaning, 0)
                     }
                     disabled={correct || incorrect}
                     style={[
                        correct && correctIndex === 0
                           ? styles.correctAnswer
                           : incorrect && incorrectIndex === 0
                           ? styles.incorrectAnswer
                           : styles.notAnswered,
                     ]}
                  >
                     <Text uppercase={false}>
                        {randomizedAlternatives[0].infinitive}
                     </Text>
                  </Button>
                  <Button
                     onPress={() =>
                        evaluateAnswers(randomizedAlternatives[1].meaning, 1)
                     }
                     disabled={correct || incorrect}
                     style={[
                        correct && correctIndex === 1
                           ? styles.correctAnswer
                           : incorrect && incorrectIndex === 1
                           ? styles.incorrectAnswer
                           : styles.notAnswered,
                     ]}
                  >
                     <Text uppercase={false}>
                        {randomizedAlternatives[1].infinitive}
                     </Text>
                  </Button>
                  <Button
                     onPress={() =>
                        evaluateAnswers(randomizedAlternatives[2].meaning, 2)
                     }
                     disabled={correct || incorrect}
                     style={[
                        correct && correctIndex === 2
                           ? styles.correctAnswer
                           : incorrect && incorrectIndex === 2
                           ? styles.incorrectAnswer
                           : styles.notAnswered,
                     ]}
                  >
                     <Text uppercase={false}>
                        {randomizedAlternatives[2].infinitive}
                     </Text>
                  </Button>
               </CardItem>
            </Card>
         )}
      </Content>
   )
}

export default CardComponentMeanings

const styles = StyleSheet.create({
   notAnswered: {
      backgroundColor: '#0000cc',
      marginRight: 5,
   },
   correctAnswer: {
      backgroundColor: '#006600',
      marginRight: 5,
   },
   incorrectAnswer: {
      backgroundColor: '#cc0000',
      marginRight: 5,
   },
})
