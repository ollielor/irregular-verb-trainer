import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'native-base';
import { styles } from '../../styles/styles';

const MasteryTextComponent = (props) => {
   return (
      <Text style={styles(props).textBodyStyleMastery}>
         <Text style={styles(props).accent}>{props.infinitive}</Text>
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