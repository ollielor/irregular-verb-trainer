import React from 'react';
import { Box } from 'native-base';

import { connect } from 'react-redux';

import { useNavigation } from '@react-navigation/native';

import Heading from '../styling/Heading';
import CardComponentResults from '../cards/CardComponentResults';

import { styles } from '../../styles/styles';
import ButtonComponent from '../buttons/ButtonComponent';

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
            <ButtonComponent
               function={() => navigation.navigate('Omat tulokseni')}
               title='Näytä koko historia'
            />
         )}
      </Box>
   );
};

const mapStateToProps = (state) => ({
   language: state.settings.language,
   results: state.results.results,
});

export default connect(mapStateToProps)(ResultHistoryView);
