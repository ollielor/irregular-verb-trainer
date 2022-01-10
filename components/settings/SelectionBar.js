import React from 'react';
import { Text } from 'native-base';

import { connect } from 'react-redux';
import { styles } from '../../styles/styles';

const SelectionBar = (props) => {
   return (
      <Text style={styles(props).selectionBar} bg='#e8e8e8' color='#7E00C5'>
         Olet valinnut {props.language === 1 ? props.verbsSwedishOwn.length : props.verbsGermanOwn.length} omaa verbiä.
      </Text>
   );
};

const mapStateToProps = (state) => ({
   language: state.settings.language,
   verbsSwedishOwn: state.verbs.verbsSwedishOwn,
   verbsGermanOwn: state.verbs.verbsGermanOwn
});

export default connect(mapStateToProps)(SelectionBar);
