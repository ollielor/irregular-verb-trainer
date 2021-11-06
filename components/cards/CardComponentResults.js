import React from 'react';
import { Box, VStack, Text } from 'native-base';

import { styles } from '../../styles/styles';

import { format } from 'date-fns';

const CardComponentResults = (props) => {
   return (
      <Box key={props.historyItem.id}>
         <VStack>
            <Box style={styles(props).containerDarkGrey} shadow='5' mb='4' p='4'>
               <Text style={{ color: '#7E00C5', fontWeight: 'bold' }}>
                  {/* {format(props.historyItem.datetime, 'DD.MM.YYYY HH:mm:ss')} */}
                  {format(new Date(props.historyItem.datetime), 'dd.MM.yyyy HH:mm:ss')}
               </Text>
               {props.showTypes && props.historyItem.type === 1 && (
                  <Text>Verbien merkitykset</Text>
               )}
               {props.showTypes && props.historyItem.type === 2 && (
                  <Text>Verbien muodot</Text>
               )}
               <Text>
                  {props.historyItem.language === 1
                     ? 'Kieli: ruotsi'
                     : 'Kieli: saksa'}
               </Text>
               <Text>Taso: {props.historyItem.level}</Text>
               <Text>
                  Pisteet:{' '}
                  {props.historyItem.points &&
                     props.historyItem.points.toFixed(2).replace('.', ',')}{' '}
                  / {props.historyItem.maxpoints} (
                  {props.historyItem.percentage &&
                     props.historyItem.percentage
                        .toFixed(2)
                        .replace('.', ',')}{' '}
                  %)
               </Text>
               <Text>
                  Oikeita vastauksia: {props.historyItem.accuracy} /{' '}
                  {props.historyItem.q_total}
               </Text>
            </Box>
         </VStack>
      </Box>
   );
};

export default CardComponentResults;
