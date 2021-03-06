import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'native-base';

const MasteryTextComponent = (props) => {
   return (
      <Text style={styles.textBodyStyle}>
         <Text style={styles.accent}>{props.infinitive}</Text>
         {' '}
         <Text>{props.meaning}</Text>
         {props.wrongAnswer && 
            <Text>
               {' '}
               (vastasit: {props.wrongAnswer})
            </Text>
         }
      </Text>
   )
}

export default MasteryTextComponent;

const styles = StyleSheet.create({
   textBodyStyle: {
      flex: 1,
      alignContent: 'flex-end'
   },
   accent: {
      fontWeight: 'bold',
      color: '#4E00C5'
   }
})