import React from 'react';
import { Text } from 'native-base';

import { connect } from 'react-redux';
import { styles } from '../../styles/styles';

const ProgressBar = (props) => {
   return (
      <Text style={styles(props).progressBar} bg='#7E00C5' color='#7E00C5'>
         {props.language === 1 ? 'Du har redan fått ' : 'Du hast schon '}
         {props.points}
         {props.language === 1 ? ' av ' : ' von '}
         {props.maxPoints}
         {props.language === 1 ? ' poäng!' : ' Punkten erreicht!'}
      </Text>
   );
};

const mapStateToProps = (state) => ({
   language: state.settings.language,
});

export default connect(mapStateToProps)(ProgressBar);
