import React, { useState, useEffect } from 'react';
import { HStack, Box, Text } from 'native-base';
import { styles } from '../../styles/styles';
import ButtonComponentNarrow from '../buttons/ButtonComponentNarrow';
import SpinnerComponent from '../styling/SpinnerComponent';
import ButtonComponentNarrowWhite from '../buttons/ButtonComponentNarrowWhite';
import ButtonBordered from '../buttons/ButtonBordered';

import { connect } from 'react-redux';

const CardComponentBrowse = (props) => {

   const [added, setAdded] = useState(false);

   useEffect(() => {
      if (props.language === 1) {
         setAdded(props.ownVerbsSwedish.includes(props.verb.meaning_id));
      } else {
         setAdded(props.ownVerbsGerman.includes(props.verb.meaning_id));
      }
   })

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
               {added &&
                  <ButtonBordered title='En osaa' bg='#ff0033' textColor='#eee' function={() => props.removeFromOwnVerbs(props.verb.meaning_id)} />
               }
               {!added &&
                  <ButtonBordered title='Osaan jo' bg='#4E00C5' textColor='#eee' function={() => props.addToOwnVerbs(props.verb.meaning_id)} />
               }
               <Text style={{ color: '#7E00C5', fontWeight: 'bold' }} mt='1'>Taso {props.level}</Text>
            </Box>
         </HStack>       
      </>
   );
};

const mapStateToProps = (state) => ({
   language: state.settings.language,
});

export default connect(mapStateToProps)(CardComponentBrowse);
