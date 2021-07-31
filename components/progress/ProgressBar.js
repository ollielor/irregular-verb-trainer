import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'native-base';

import { connect } from 'react-redux';

const ProgressBar = (props) => {

   return (
      <Text style={
          styles.progressBar
    }>
          {props.language === 1 ? 'Du har redan fått ' : 'Du hast schon '}
          {props.points}{props.language === 1 ? ' av ' : ' von '}{props.maxPoints}
          {props.language === 1 ? ' poäng!' : ' Punkten erreicht!'}
      </Text>
   );
};

const mapStateToProps = (state) => ({
    language: state.settings.language,
 });
 
 export default connect(mapStateToProps)(ProgressBar);

 const styles = StyleSheet.create({
     progressBar: {
         color: "#7E00C5",
         padding: 10,
         textAlign: 'center',
     }
 })

