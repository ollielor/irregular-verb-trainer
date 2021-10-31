import React from 'react';
import { Button, Box, Text } from 'native-base';

import { connect } from 'react-redux';

import { useNavigation } from '@react-navigation/native';

import Heading from '../styling/Heading';
import CardComponentResults from '../cards/CardComponentResults';

import { styles } from '../../styles/styles';

const ResultHistoryView = (props) => {
   const navigation = useNavigation();

   return (
      <Box>
         {!props.hideButton && <Heading>3 viimeisintä tulosta</Heading>}
         {props.results &&
            props.results
               .filter(
                  (result) =>
                     result.language === props.language &&
                     parseInt(result.level) === parseInt(props.historyLevel) &&
                     parseInt(result.type) === parseInt(props.type)
               )
               .sort((a, b) =>
                  a.datetime < b.datetime ? 1 : a.datetime > b.datetime ? -1 : 0
               )
               .map((historyItem, index) => (
                  <CardComponentResults
                     showTypes
                     historyItem={historyItem}
                     key={index}
                  />
               ))}
         {!props.hideButton && (
            <Button
               onPress={() => navigation.navigate('Omat tulokseni')}
               style={styles(props).historyButtonResults}
            >
               <Text uppercase={false}>Näytä koko historia</Text>
            </Button>
         )}
      </Box>
   );
};

const mapStateToProps = (state) => ({
   language: state.settings.language,
   results: state.results.results,
});

export default connect(mapStateToProps)(ResultHistoryView);
