import React, { useState, useEffect } from 'react';
import { HStack, Box, Text, usePropsWithComponentTheme } from 'native-base';
import { styles } from '../../styles/styles';
import ButtonComponentNarrow from '../buttons/ButtonComponentNarrow';
import SpinnerComponent from '../styling/SpinnerComponent';
import ButtonComponentNarrowWhite from '../buttons/ButtonComponentNarrowWhite';
import ButtonBordered from '../buttons/ButtonBordered';

import { connect } from 'react-redux';
import SwitchBrowse from '../styling/SwitchBrowse';

const CardComponentBrowse = (props) => {

   const getAdded = (language) => {
      if (language === 1) {
         return props.ownVerbsSwedish.includes(props.verb.verb_id);
      } else if (language === 2) {
         return props.ownVerbsGerman.includes(props.verb.verb_id); 
      }
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
               <SwitchBrowse added={getAdded(props.language)} addToOwnVerbs={props.addToOwnVerbs} removeFromOwnVerbs={props.removeFromOwnVerbs} verbId={props.verb.verb_id} />
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
