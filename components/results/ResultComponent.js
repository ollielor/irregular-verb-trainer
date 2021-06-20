import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Body, Card, CardItem, Content, Text } from 'native-base';
import Subheading from '../styling/SpinnerComponent';
import ProgressComponent from './ProgressComponent';
import ResultHistoryView from './ResultHistoryView';

import { connect } from 'react-redux';
   
const ResultHistoryComponent = (props) => {

   return (

         <ResultHistoryView
            hideButton
            resultHistory={props.resultData.filter(
               (historyItem) =>
                  historyItem.level === props.historyLevel &&
                  historyItem.language === props.language
            )}
         />
   );

}

const mapStateToProps = (state) => ({
   language: state.settings.language,
});

export default connect(mapStateToProps)(ResultHistoryComponent);

