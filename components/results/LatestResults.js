import React from 'react';

import { Button, Box, Text } from 'native-base';

import { useNavigation } from '@react-navigation/native';

import { connect } from 'react-redux';

import Heading from '../styling/Heading';
import CardComponentResults from '../cards/CardComponentResults';
import { styles } from '../../styles/styles';

const LatestResults = (props) => {
   const navigation = useNavigation();

   return (
      <Box>
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
         {!props.hideButton && (
            <Button
               onPress={() => navigation.navigate('Omat tulokseni')}
               style={styles(props).historyButtonResults}
            >
               {props.results.length > 0 && (
                  <Text uppercase={false}>Näytä koko historia</Text>
               )}
            </Button>
         )}
      </Box>
   );
};

const mapStateToProps = (state) => ({
   language: state.settings.language,
   results: state.results.results,
});

export default connect(mapStateToProps)(LatestResults);
