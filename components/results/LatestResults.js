import React from 'react';

import { Box, Button, Text } from 'native-base';

import { useNavigation } from '@react-navigation/native';

import { connect } from 'react-redux';

import Heading from '../styling/Heading';
import CardComponentResults from '../cards/CardComponentResults';
import ButtonComponentNarrow from '../buttons/ButtonComponentNarrow';
import { styles } from '../../styles/styles';

const LatestResults = (props) => {
   const navigation = useNavigation();

   return (
      <Box mt='5'>
         <Heading>
            {props.count} viimeisintä tulosta{' '}
            {props.language === 1 ? '(ruotsi)' : '(saksa)'}
         </Heading>
         {props.results.length === 0 && (
            <Text style={styles(props).textResults}>
               Sinulla ei ole vielä suorituksia.
            </Text>
         )}
         {props.results &&
            props.results
               .filter((historyItem) => historyItem.language === props.language)
               .sort((a, b) =>
                  a.datetime < b.datetime ? 1 : a.datetime > b.datetime ? -1 : 0
               )
               .slice(0, props.count)
               .map((historyItem, index) => (
                  <CardComponentResults
                     historyItem={historyItem}
                     key={index}
                     showTypes={props.showTypes}
                  />
               ))}
         {!props.hideButton && props.results.length > 0 && (
            <ButtonComponentNarrow
               function={() => navigation.navigate('Omat tulokseni')}
               title='Näytä koko historia'
               withMargin
            />)}
      </Box>
   );
};

const mapStateToProps = (state) => ({
   language: state.settings.language,
   results: state.results.results,
});

export default connect(mapStateToProps)(LatestResults);
