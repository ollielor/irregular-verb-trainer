import React, { useState, useEffect } from 'react';
import { HStack, Box, Text } from 'native-base';
import { styles } from '../../styles/styles';
import ButtonComponentNarrow from '../buttons/ButtonComponentNarrow';
import SpinnerComponent from '../styling/SpinnerComponent';

const CardComponentBrowse = (props) => {

   const addToList = () => {
      props.setOwnVerbs([...props.ownVerbs, props.verb.verb_id]);
      console.log('ownVerbList after add: ', props.ownVerbs);
   };

   const removeFromList = (meaningId) => {
      setOwnVerbList(ownVerbList.filter((id) => meaningId !== id));
      console.log('ownVerbList after remove: ', ownVerbList);
   };

   return (
      <>
          <HStack style={styles(props).cardComponentGrey} flexDirection='row'>
            <Box shadow='2' style={styles(props).browseBoxStyle} flex='2'>
               <Text style={{ color: '#7E00C5', fontWeight: 'bold' }}>
                  {props.verb.infinitive},
                  {'\n'}{props.verb.present}
                  {props.verb.present_alt && ` / ${props.verb.present_alt}`},
                  {'\n'}{props.verb.past}
                  {props.verb.past_alt && ` / ${props.verb.past_alt}`},
                  {'\n'}{props.verb.presperf}
                  {props.verb.presperf_alt && ` / ${props.verb.presperf_alt}`}
               </Text>
               <Text>{props.verb.meaning}</Text>
            </Box>
            <Box flex='1'>
               <ButtonComponentNarrow title='Osaan' function={() => addToList(props.verb.verb_id)} />
               <Text style={{ color: '#7E00C5', fontWeight: 'bold' }} mt='1'>Taso {props.level}</Text>
            </Box>
         </HStack>
         
      </>
   );
};

export default CardComponentBrowse;
