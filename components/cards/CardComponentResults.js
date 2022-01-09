import React, { useState } from 'react';
import { Box, VStack, Text } from 'native-base';

import { styles } from '../../styles/styles';

import { format } from 'date-fns';
import isValid from 'date-fns/isValid';
import formatISO from 'date-fns/formatISO'

const CardComponentResults = (props) => {

   return (
      <Box key={props.historyItem.id}>
         <VStack>
            <Box style={styles(props).containerDarkGrey} shadow='5' mb='4' p='4'>
               <Text style={{ color: '#7E00C5', fontWeight: 'bold', fontFamily: 'Quicksand_Bold' }}>
                  {isValid(props.historyItem.datetime) ? format(props.historyItem.datetime, 'dd.MM.yyyy HH:mm') : props.historyItem.datetime}
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
               <Text>Taso: {props.historyItem.level === 4 ? 'Omat verbit' : props.historyItem.level}</Text>
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
