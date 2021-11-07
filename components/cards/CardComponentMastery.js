import React from 'react';
import { Box, Stack, VStack, Text } from 'native-base';
import MasteryTextComponent from '../styling/MasteryTextComponent';

import { styles } from '../../styles/styles';

const CardComponentMastery = (props) => {
   return (
      <Stack style={styles(props).containerGrey} p='3'>
         <VStack>
            <Box
               p='2'
               style={
                  props.mastered
                     ? styles(props).mastered
                     : styles(props).notMastered
               }
            >
               <Text
                  style={
                     props.notMastered
                        ? styles(props).notMasteredText
                        : styles(props).masteredText
                  }
               >
                  {props.mastered && 'Nämä osaat jo:'}
                  {props.notMastered && 'Kertaa vielä näitä:'}
               </Text>
            </Box>
         </VStack>
         <VStack>
            <Box p='2'>
               {props.mastered &&
                  props.mastered.map((item, index) => (
                     <MasteryTextComponent
                        key={index}
                        infinitive={item.infinitive}
                        meaning={item.meaning}
                     />
                  ))}
               {props.notMastered &&
                  props.notMastered.map((item, index) => (
                     <MasteryTextComponent
                        key={index}
                        infinitive={item.infinitive}
                        meaning={item.meaning}
                        wrongAnswer={item.wrongAnswer}
                     />
                  ))}
            </Box>
         </VStack>
      </Stack>
   );
};

export default CardComponentMastery;
