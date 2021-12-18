import React, { useState, useEffect } from 'react';
import { HStack, Box, Text } from 'native-base';
import { styles } from '../../styles/styles';
import ButtonComponentNarrow from '../buttons/ButtonComponentNarrow';

const CardComponentBrowse = (props) => {

   const [addedToList, setAddedToList] = useState(true);

   const addToList = () => {
      setOwnVerbList([...ownVerbList, props.verb.meaning_id]);
      console.log('ownVerbList after add: ', ownVerbList);
   };

   const removeFromList = (meaningId) => {
      setOwnVerbList(ownVerbList.filter((id) => meaningId !== id));
      console.log('ownVerbList after remove: ', ownVerbList);
   };

   return (
      <HStack style={styles(props).cardComponentGrey} flexDirection='row'>
         <Box shadow='2' style={styles(props).browseBoxStyle} flex='2'>
            <Text style={{ color: '#7E00C5', fontWeight: 'bold' }}>
               {props.verb.infinitive},&nbsp;
               {props.verb.present},&nbsp;
               {props.verb.present_alt && ` / ${props.verb.present_alt}`}
               {!props.verb.past_alt && `${props.verb.past}, `}
               {props.verb.past_alt.length > 1 &&
                  `${props.verb.past} / ${props.verb.past_alt}`}
               {props.verb.presperf}
               {props.verb.presperf_alt &&
                  ` / ${props.verb.presperf_alt}`}
            </Text>
            <Text>{props.verb.meaning}</Text>
         </Box>
         <Box flex='1'>
            <ButtonComponentNarrow title='Osaan' function={addToList} />
         </Box>
      </HStack>
   );
};

export default CardComponentBrowse;
