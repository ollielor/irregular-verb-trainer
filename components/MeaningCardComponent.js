import React, { useState } from 'react';
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

   const [correct, setCorrect] = useState(false);

   const evaluate = meaning => {
      if (meaning === props.alternatives[0].correctInfinitive) {
         setCorrect(true);
      }
   }

    return (
      <Content>
         <Card>
            <CardItem header>
               <Body>
                  {props.alternatives[0].correctInfinitive}
               </Body>
                  {props.alternatives.map(alternative => 
                     <Button onPress={evaluate(alternative.meaning)} style={correct && styles.correctAnswer}>{alternative.meaning}</Button>
                  )}
               <Button>
               </Button>
            </CardItem>
         </Card>
      </Content>
    );
}

export default MeaningCardComponent;

const styles = StyleSheet.create({
   correctAnswer: {
      backgroundColor: 'red'
   }
});
